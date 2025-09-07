# Advanced Repo Readme Generator

A simple tool to generate professional `README.md` files for your **React + Vite** projects, powered by **Gemini AI**.  
Supports both public and private GitHub repositories.

---

## ✨ Features

- **Auto README Generation** – Instantly creates README files with installation, usage, and project details.  
- **Supports Public & Private Repositories** – Works seamlessly with any GitHub repo.  
- **Secure Authentication** – Uses GitHub Personal Access Tokens (PAT) for private repositories.  
- **Vite & Tailwind Integration** – Preconfigured for React + Vite + Tailwind CSS projects.  
- **Gemini AI Integration** – Generates high-quality README content.  
- **Error Handling** – Provides informative error messages.  
- **Copy to Clipboard** – One-click copy of the generated README.  

---

## 📦 Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

---

## 🚀 Usage

1. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2. Open your browser at: `http://localhost:5173/`

3. Enter your GitHub **username** and **repository name**.

4. For private repositories, enter your **GitHub Personal Access Token (PAT)**.  

   **How to generate a PAT:**
   1. Go to **GitHub → Settings → Developer Settings → Personal Access Tokens → Generate new token**.  
   2. Select the **repo** scope for full repository access.  

5. Click **Generate README**.  
6. Copy the generated README.md using the **Copy button**.  

---

## 📂 Project Structure

.
├── index.html
├── src/
│ ├── main.jsx # React entry point
│ ├── App.jsx # Main component
│ └── index.css # Global styles (includes Tailwind imports)
├── vite.config.js # Vite configuration
├── package.json # Project scripts & dependencies
├── eslint.config.js # ESLint configuration
└── package-lock.json # Exact dependency versions

yaml
Copy code

---

## 📚 Dependencies

- **react** – UI library  
- **react-dom** – React DOM renderer  
- **vite** – Fast build tool & dev server  
- **@vitejs/plugin-react** – React plugin for Vite  
- **tailwindcss** – Utility-first CSS framework  
- **@tailwindcss/vite** – Tailwind plugin for Vite  
- **lucide-react** – Beautiful SVG icons as React components  
- **eslint** – JavaScript linting  
- **@eslint/js** – Recommended ESLint rules  
- **eslint-plugin-react-hooks** – React Hooks rules  
- **eslint-plugin-react-refresh** – React Fast Refresh rules  
- **globals** – Common JS environment globals  
- **@types/react**, **@types/react-dom** – TypeScript type definitions  

---

## 📜 Scripts

- `npm run dev` – Start development server  
- `npm run build` – Build for production  
- `npm run lint` – Run ESLint checks  
- `npm run preview` – Preview production build  

---

## ⚙️ ESLint

Configured with:  
- Recommended rules  
- React Hooks rules  
- React Refresh rules  
- Custom globals and parser options  

---

## 🔑 Environment Variables

- `apiKey` → Gemini API Key  
  Replace `"AIzaSyAYIn86j-FdhSF3wEi6gcjfHImcL8tyoj4"` with your own Gemini API key.  

---

## 🤝 Contributing

Contributions are welcome!  
Please submit a pull request if you’d like to improve the project.  

---

## 📄 License

This project is licensed under the **MIT License**.
