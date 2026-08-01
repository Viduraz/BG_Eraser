<div align="center">
  <img src="https://raw.githubusercontent.com/imgly/background-removal-js/main/assets/hero.jpg" alt="Background Removal Hero" width="100%" />

  <h1>BgEraser — Private AI Background Removal</h1>
  
  <p>
    <strong>A lightning-fast, 100% private, client-side background removal tool built with Next.js 14.</strong>
  </p>

  <p>
    <a href="https://bgeraser.com">Live Demo</a> •
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#monetization--seo">Monetization</a>
  </p>
</div>

---

## ⚡ Why BgEraser?

Unlike traditional background removal APIs that charge per image and require uploading user photos to a remote server, **BgEraser runs entirely in the browser**. 

Powered by WebAssembly (WASM) and ONNX models via [`@imgly/background-removal`](https://github.com/imgly/background-removal-js), it delivers production-grade image matting locally on the user's device. 

**Result:** Zero server costs, infinite scalability, and absolute privacy for your users.

---

## ✨ Features

- 🧠 **On-Device AI Processing:** Uses WASM to process images directly in the browser. No uploads, no API keys, no server costs.
- 🎨 **Next.js 14 App Router:** Modern React architecture utilizing server components and Turbopack.
- 💅 **Tailwind CSS v4:** Beautiful, responsive, and accessible UI out of the box.
- 💰 **Monetization Ready:** Built-in dual-state Google AdSense placeholders that seamlessly handle ad-blockers.
- 🍪 **GDPR / UK PECR Compliant:** Custom, animated cookie consent banner that controls AdSense script loading.
- 📈 **SEO Optimized:** Dynamic routing (`app/[niche]`) automatically generates targeted landing pages (e.g., "Car Photos", "Real Estate") to capture organic traffic.
- 🛡️ **Bulletproof Error Handling:** Elegant fallback UI for devices without WebAssembly support, Out-Of-Memory errors, or network timeouts.

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Viduraz/BG_Eraser.git
cd BG_Eraser
npm install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env.local
```
Then, populate `.env.local` with your AdSense and Google Analytics credentials if you wish to enable them. (Leave them blank for local development to keep the placeholders active).

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗️ Architecture & Codebase

- **`components/BackgroundRemover.tsx`**: The core AI engine. Handles drag-and-drop, dynamic WASM loading, processing states, and error catching.
- **`components/AdBanner.tsx`**: A robust AdSense wrapper that listens for user consent and catches ad-blocker rejections to display a fallback placeholder.
- **`components/CookieBanner.tsx`**: Manages localStorage state and emits custom events to trigger AdSense initialization safely.
- **`app/[niche]/page.tsx`**: Dynamic SEO routes fueled by `lib/niches.ts` to capture long-tail keywords.

---

## ⚙️ Monetization & SEO

To get approved for Google AdSense, this repository includes:
1. **Extensive Text Content:** The homepage and dynamic niche pages are populated with high-quality, relevant text to avoid "Low Value Content" rejections.
2. **Mandatory Legal Pages:** Fully fleshed out Privacy Policy (`/privacy-policy`), Terms of Service (`/terms`), and Contact (`/contact`) pages.
3. **Cookie Consent:** AdSense scripts will **not** load until the user clicks "Accept All" on the cookie banner.

---

## 🤝 Acknowledgments

- Core AI engine by [IMG.LY](https://img.ly)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Framework by [Next.js](https://nextjs.org)

<div align="center">
  <br />
  <p>Made with ❤️ for privacy and the open web.</p>
</div>
