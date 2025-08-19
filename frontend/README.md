# Yoga & Wellness Packs - React App

A modern React + TypeScript project for a Yoga and Wellness platform. Users can browse and purchase yoga or makeup video packs. Includes animated cards, styled-components, routing, and authentication.

---

## 🚀 Features

- Login & logout handling (with route protection)
- Beautiful card components with hover effects
- Dynamic video pack data (Yoga, Makeup)
- Responsive layout using Styled Components
- Modular code structure (components/pages)
- Background image, styled navbar, clean design

---

## 📦 Getting Started (Development)

1. Clone or extract this project on your machine

2. Open the project folder and install dependencies:

    npm install

3. Run the development server:

    npm run dev

4. Open your browser and go to:

    http://localhost:5173

---

## 🛠 Build for Production

To generate a production-ready static build:

    npm run build

The output will be in the `dist/` folder.

---

## 🌐 Serve Production Locally

You can preview the production build using `serve`:

1. Install it globally (if not already):

    npm install -g serve

2. Serve the app:

    serve -s dist

Then go to http://localhost:3000

---

## 🔧 Project Structure

- `src/`
  - `components/` — Reusable components (e.g., PackCard, Navbar)
  - `pages/` — Page views like Login, Home, Yoga, etc.
  - `data/` — Static pack data (yogaPacks, makeupPacks)
  - `App.tsx` — Main router and layout
- `public/` — Public assets
- `vite.config.ts` — Vite config
- `tsconfig.json` — TypeScript config

---

## ✅ Dependencies

- React + TypeScript
- react-router-dom
- styled-components
- Vite

---

## 📄 .gitignore Notes

Your `.gitignore` already excludes:

- node_modules
- dist
- IDE files
- logs

This keeps your repo clean and lightweight.

---

## 👥 Author

You — or your team

---

## 📬 License

MIT (or your preferred license)
