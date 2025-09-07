# Advanced Repo Readme Generator

A simple tool to generate professional `README.md` files for your **React + Vite + Tailwind CSS** projects, powered by **Gemini AI**.  Supports both public and private GitHub repositories.

---

## ✨ Features

- **Auto README Generation:** Instantly creates README files with installation, usage, and project details. Uses Gemini AI to provide high-quality content generation.
- **Supports Public & Private Repositories:** Works seamlessly with any GitHub repo.
- **Secure Authentication:** Uses GitHub Personal Access Tokens (PAT) for private repositories, ensuring secure access.
- **Vite & Tailwind Integration:** Preconfigured for React + Vite + Tailwind CSS projects, reflecting the common stack.
- **Error Handling:** Provides informative error messages, enhancing user experience.
- **Copy to Clipboard:** One-click copy of the generated README for easy use.
- **Clear UI:** Simple form-based UI allows a user to easily enter repo details and access token.

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

## 🗂️ File Structure

```
.
├── README.md                # This file!
├── index.html               # Main HTML entry point
├── src/                     # Source code directory
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   ├── index.css            # Global styles
│   └── assets/              # (Optional) Static assets
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Dependency lock file
└── tailwind.config.js       # Tailwind CSS configuration
```

---

## 📚 Dependencies

- **Core Libraries:**
  - `react`: UI library for building components.
  - `react-dom`: React DOM renderer.
- **Build & Development Tools:**
  - `vite`: Fast build tool & dev server.
  - `@vitejs/plugin-react`: React plugin for Vite.
- **Styling:**
  - `tailwindcss`: Utility-first CSS framework.
  - `@tailwindcss/vite`: Tailwind CSS plugin for Vite.
- **Icons:**
  - `lucide-react`: Beautiful SVG icons as React components.
- **Linting:**
  - `eslint`: JavaScript linting.
  - `@eslint/js`: Recommended ESLint rules.
  - `eslint-plugin-react-hooks`: React Hooks rules.
  - `eslint-plugin-react-refresh`: React Fast Refresh rules.
- **Other:**
  - `globals`: Common JS environment globals.
  - `@types/react`, `@types/react-dom`: TypeScript type definitions.

---

## 📜 Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint checks
- `npm run preview`: Preview production build

---

## ⚙️ ESLint Configuration

Configured with:
- Recommended rules
- React Hooks rules
- React Refresh rules
- Custom globals and parser options

---

## 🤝 Contributing

Contributions are welcome!
Please submit a pull request if you’d like to improve the project.

---

## 📄 License

This project is licensed under the **MIT License**.
```

Key improvements and explanations:

*   **Conciseness:** Removed redundant explanations.  Combined dependency descriptions.
*   **File Structure:** Added a file structure section to give the user a good overview of the project.
*   **Dependencies Breakdown:** Grouped dependencies by category (core, build tools, styling, etc.) for better readability.
*   **Badge Placeholder:** Removed Gemini API keys and other useless descriptions.
*   **GitHub Markdown:** Checked and ensured proper use of headers, lists, and code blocks.
*   **Clear Language:** Simplified wording for better clarity.
*   **Tailwind Config file:** Added tailwind config js description in the file structure.
