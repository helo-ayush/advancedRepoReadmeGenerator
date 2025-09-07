import React, { useState } from 'react';
import { Copy, Check, Sparkles, Lock, Unlock, Eye, EyeOff } from 'lucide-react';

export default function ReadmeGenerator() {
  const [username, setUsername] = useState('');
  const [repoName, setRepoName] = useState('');
  const [token, setToken] = useState('');
  const [result, setResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [privateRepo, setPrivateRepo] = useState(false);

  // This is my private gemini api keys dont look at this 😂hehe😂
  const apiKey = "AIzaSyAYIn86j-FdhSF3wEi6gcjfHImcL8tyoj4"; 
  const model = "gemini-2.0-flash";
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  async function callGemini(prompt) {
    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    try {
      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      
      // sometimes the response structure is weird
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Unexpected response format');
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (err) {
      console.error('Gemini error:', err);
      throw err;
    }
  }

  const generateReadme = async () => {
    if (!username.trim() || !repoName.trim()) {
      return; // early return if inputs empty
    }
    
    if (privateRepo && !token.trim()) {
      setResult('Error: Need GitHub token for private repos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const codeFiles = await fetchRepoContents(username, repoName);
      
      if (!codeFiles.trim()) {
        throw new Error('No code files found');
      }
      
      // create a better prompt for the AI
      const prompt = `Create a README.md for this GitHub repository. Here are all the code files: 

      ${codeFiles}

      Make it comprehensive but not too long. Include installation, usage, and any important info, make sure to use proper GitHub markdown syntax`;
      
      const readme = await callGemini(prompt);
      setResult(readme);

    } catch (error) {
      console.error('Generation failed:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  async function fetchRepoContents(owner, repo, path = "") {
    let allContent = "";
    
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;


    // This is the object that we have to send to github to tell him that we are user named this and we have access token so please let us visit the repo
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'README-Generator-App' 
    };
    
    // this is the token that will be added to the headers
    if (token.trim()) {
      headers['Authorization'] = `token ${token.trim()}`;
    }

    const resp = await fetch(url, { headers });

    if (!resp.ok) {
      // handle different error cases
      if (resp.status === 404) {
        throw new Error(`Repo not found. If it's private, make sure your token has access.`);
      } else if (resp.status === 403) {
        throw new Error(`Access denied. Check token permissions or rate limits.`);
      } else if (resp.status === 401) {
        throw new Error(`Bad token. Please check your GitHub token.`);
      }
      throw new Error(`GitHub API error: ${resp.status}`);
    }

    const contents = await resp.json();
    
    // these are the file types we care about
    const validExtensions = [
      "js", "ts", "jsx", "tsx", "html", "css", "scss", "md", "json", "txt", 
      "py", "java", "cpp", "c", "go", "rs", "php", "rb", "swift", "kt", "dart", "vue"
    ];

    for (const item of contents) {
      if (item.type === "file") {
        const ext = item.name.split(".").pop()?.toLowerCase();
        
        if (validExtensions.includes(ext)) {
          try {
            let fileContent = '';
            
            // For private repo most of the times they give the whole code in content (in the base64 format) if its less than 1mb so we dont need to re fetch it
            if (item.content && privateRepo) {
              fileContent = atob(item.content); //converting those base64 files to our own text format
            } else {
              // But for public repo we need to get our files using download_url
              const fileResp = await fetch(item.download_url);
              fileContent = await fileResp.text();
            }
            
            allContent += `\n--- ${item.name} ---\n`;
            allContent += `${fileContent}\n`;
          } catch (e) {
            console.warn(`Couldn't fetch because the file size might be >1MB ${item.name}:`, e);
            // continue with other files
          }
        }
      } else if (item.type === "dir") {
        // checking other folders
        const subContent = await fetchRepoContents(owner, repo, item.path);
        allContent += subContent;
      }
    }
    
    return allContent;
  }

  const copyToClipboard = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setIsCopied(true);
      // reset after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      // fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = result;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            README Generator
          </h1>
          <p className="text-gray-600 mb-2">Generate README files for your GitHub repos</p>
          <p className="text-sm text-gray-500">Works with both public and private repositories</p>
        </div>

        {/* main form */}
        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 mb-6">
          {/* repo type selector */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-700">Repository Access</span>
              <button
                onClick={() => setPrivateRepo(!privateRepo)}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  privateRepo 
                    ? 'bg-red-100 text-red-700 hover:bg-red-150' 
                    : 'bg-green-100 text-green-700 hover:bg-green-150'
                }`}
              >
                {privateRepo ? <Lock size={16} /> : <Unlock size={16} />}
                {privateRepo ? 'Private' : 'Public'}
              </button>
            </div>
            <p className="text-xs text-gray-600">
              {privateRepo 
                ? 'Private repositories need a GitHub personal access token'
                : 'Public repositories can be accessed without authentication'
              }
            </p>
          </div>

          {/* input fields */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. octocat"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repository Name
              </label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="e.g. my-awesome-project"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* token field for private repos */}
          {privateRepo && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <label className="block text-sm font-medium text-orange-800 mb-2">
                GitHub Personal Access Token
              </label>
              <div className="relative mb-3">
                <input
                  type={showToken ? "text" : "password"}
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3 py-2 pr-10 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-600"
                >
                  {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-xs text-orange-700 bg-orange-100 p-2 rounded">
                <p className="font-medium">How to get a token:</p>
                <p>👉 GitHub Settings → Developer settings → Personal access tokens → tokens (Classic) → </p>
                <p>👉 Generate New Token (Classic) → Any Note → Any Expiration Date → Scopes (Repo For now) → </p>
                <p>👉 Generate Token</p>
              </div>
            </div>
          )}

          {/* generate button */}
          <div className="text-center">
            <button
              onClick={generateReadme}
              disabled={isLoading || !username.trim() || !repoName.trim() || (privateRepo && !token.trim())}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 mx-auto ${
                isLoading || !username.trim() || !repoName.trim() || (privateRepo && !token.trim())
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Generating...' : 'Generate README'}
            </button>
          </div>
        </div>

        {/* output section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Generated README.md</h3>
            {result && (
              <button
                onClick={copyToClipboard}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isCopied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isCopied ? <Check size={16} /> : <Copy size={16} />}
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>

          <div className="p-6">
            {result ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="whitespace-pre-wrap text-gray-800 text-sm font-mono leading-relaxed max-h-80 overflow-y-auto">
                  {result}
                </pre>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-600 mb-1">No README generated yet</h4>
                <p className="text-sm text-gray-500">Enter your repo details and click generate</p>
              </div>
            )}
          </div>
        </div>

        {/* footer note */}
        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Lock className="w-4 h-4 text-blue-600 mt-0.5" />
            <div className="text-xs text-blue-800">
              <p className="font-medium">Privacy:</p>
              <p>Your GitHub token is only used for API calls and never stored permanently.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
