# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 폴더 구조

```
newsFeed
├─ public
│  └─ icons
│     └─ vite.svg
├─ src
│  ├─ api
│  │  └─ supabase.js
│  ├─ assets
│  │  ├─ db
│  │  ├─ fonts
│  │  └─ images
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Button.jsx
│  │  │  ├─ Menu.jsx
│  │  │  └─ Modal.jsx
│  │  ├─ layout
│  │  │  ├─ Footer.jsx
│  │  │  ├─ Header.jsx
│  │  │  └─ Layout.jsx
│  │  ├─ mypage
│  │  │  └─ Mypage.jsx
│  │  └─ sample
│  │     └─ Sample.jsx
│  ├─ hooks
│  │  └─ useThrottle.js
│  ├─ redux
│  │  ├─ config
│  │  │  └─ configStore.js
│  │  └─ slices
│  │     └─ functionSlice.js
│  ├─ shared
│  │  └─ Router.jsx
│  ├─ styles
│  │  ├─ animation.js
│  │  ├─ common.js
│  │  ├─ index.css
│  │  ├─ layout.js
│  │  └─ reset.css
│  ├─ index.jsx
│  ├─ App.jsx
├─ eslint.config.js
├─ vite.config.js
├─ package.json
├─ .prettierrc
├─ .gitignore
├─ index.html
├─ README.md
├─ yarn.lock
└─ .env

```
