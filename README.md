# 🚀 Sniplink

<div align="center">

### *Modern URL shortening with a sleek developer-first experience.*

A beautifully crafted URL shortener built with **Next.js 15**, featuring a dark cyber-inspired UI, blazing-fast interactions, and a scalable architecture ready for backend integration.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38BDF8?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-black?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

</div>

---

## 🌌 Overview

**Sniplink** is a modern URL shortener web application focused on delivering a polished user experience with a sleek dark-themed interface and futuristic aesthetics.

The project is currently in its **frontend phase**, featuring a fully responsive UI built with the latest Next.js App Router architecture. Backend functionality such as database integration, redirects, analytics, and authentication is planned for future development.

---

## 📸 Preview

> Replace this placeholder with actual project screenshots or GIFs.

```md
![Sniplink Preview](./public/preview.png)
```

---

# ✨ Features

## ✅ Currently Implemented (Frontend/UI)

- 🎨 Modern dark-themed responsive UI
- ⚡ Simulated URL shortening experience
- 📋 Copy-to-clipboard functionality
- 🌐 Responsive navigation header
- 🧩 Feature showcase cards
- 📊 Placeholder statistics section
- 🦶 Elegant footer with navigation/socials
- 💡 Neon glow effects & soft gradients
- 📱 Fully responsive across devices

---

## 🛠 Planned Backend Features

- 🔗 Real URL shortening functionality
- 🗄 Database integration for URL mappings
- 🚀 Dynamic redirect routes (`/[shortCode]`)
- 📈 Analytics & click tracking
- 👤 User authentication system
- 🏷 Custom aliases
- 📦 Public API access
- 📱 QR code generation
- 🛡 Rate limiting & abuse protection

---

# 🖥 Tech Stack

## Frontend

- ⚛️ Next.js 15 (App Router)
- 🟨 JavaScript (JSX)
- 🎨 Tailwind CSS v4
- 🧩 shadcn/ui
- 🎯 Lucide React Icons

## Utilities & Tooling

- 🧠 Geist Font Family
- 📦 npm
- 🛠 Utility helpers (`cn()`)

---

# 🎨 Design System

Sniplink follows a modern cyber-inspired visual style:

- 🌑 Near-black background (`#09090b`)
- 🟢 Neon green accent color (`#22c55e`)
- ✨ Glow effects & soft gradients
- 🔲 Subtle grid overlays
- 🪐 Background gradient orbs
- 🔤 Geist Sans & Geist Mono typography

---

# 📂 Project Structure

```bash
sniplink/
│
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
│
├── components/
│   ├── header.jsx
│   ├── hero-section.jsx
│   ├── features-section.jsx
│   ├── footer.jsx
│   └── ui/
│
├── hooks/
│   ├── use-mobile.js
│   └── use-toast.js
│
├── lib/
│   └── utils.js
│
├── public/
│
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/sniplink.git
```

Navigate into the project directory:

```bash
cd sniplink
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```bash
http://localhost:3000
```

---

# ⚙️ Current Application Flow

```text
User enters URL
       ↓
Fake short code generated
       ↓
Shortened URL displayed
       ↓
Copy-to-clipboard interaction
```

> ⚠️ Note: No actual backend/database functionality exists yet.

---

# 🧠 Future Roadmap

## Phase 1 — Backend Core

- [ ] Database setup
- [ ] URL storage system
- [ ] Redirect handling
- [ ] API route implementation

## Phase 2 — Analytics & Security

- [ ] Click analytics
- [ ] Rate limiting
- [ ] Validation & sanitization
- [ ] Abuse prevention

## Phase 3 — User Features

- [ ] Authentication
- [ ] Dashboard
- [ ] Custom aliases
- [ ] QR code generation

## Phase 4 — Developer Experience

- [ ] Public REST API
- [ ] API keys
- [ ] Documentation
- [ ] Deployment pipeline

---

# 🧪 Example Planned API Routes

```http
POST /api/shorten
GET  /api/link/[shortCode]
GET  /[shortCode]
```

---

# 🤝 Contributing

Contributions, ideas, and improvements are always welcome.

## To contribute:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push to your branch

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request 🚀

---

# 📌 Suggested Improvements

Some great additions you can build next:

- Redis caching
- PostgreSQL or MongoDB integration
- JWT/Auth.js authentication
- Link expiration
- Admin dashboard
- Geo-based analytics
- Docker support
- CI/CD workflows

---

# 🛡 License

This project is currently licensed under the **MIT License**.

```md
MIT License © 2026 Your Name
```

---

# 💚 Acknowledgements

Built with:

- ⚛️ Next.js
- 🎨 Tailwind CSS
- 🧩 shadcn/ui
- 💡 Inspiration from modern SaaS landing pages

---

<div align="center">

### ⭐ If you like this project, consider giving it a star!

**Sniplink — Shorten smarter. Share faster.**

</div>