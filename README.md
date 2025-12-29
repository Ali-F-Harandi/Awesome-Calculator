

# 🧮 Awesome Calculator (Super App)

[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat-square&logo=github)](https://Ali-F-Harandi.github.io/Awesome-Calculator/)
[![Version](https://img.shields.io/badge/Version-3.2.1.0-orange?style=flat-square)](./CHANGELOG.md)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![React](https://img.shields.io/badge/Built%20With-React%20%2B%20TypeScript-61dafb?style=flat-square&logo=react)](https://react.dev)

**Awesome Calculator** is a robust, bilingual (English/Persian), and progressive web application (PWA) designed to replace your default system calculator. It features a modern component-based architecture, fluid animations, and a suite of mathematical tools ranging from basic arithmetic to scientific calculations, matrix operations, statistics, unit conversions, graphing, and more!

🔗 **Live Demo:** [Click here to launch the app](https://Ali-F-Harandi.github.io/Awesome-Calculator/)

---

## 📚 Documentation (مستندات)

We have prepared comprehensive user guides to help you get the most out of the app:

| Language | Guide Link |
| :--- | :--- |
| 🇺🇸 **English** | [📘 **Read User Guide**](./docs/USER_GUIDE_EN.md) |
| 🇮🇷 **Persian** | [📘 **خواندن راهنمای فارسی**](./docs/USER_GUIDE_FA.md) |

---

## ✨ Features (ویژگی‌ها)

### 1. 🧮 Modes & Functionality
- **Standard Mode**: Arithmetic operations with support for visual operators (`×`, `÷`) and large expression parsing.
- **Scientific Mode**: Advanced math including Trigonometry, Logarithms, Roots & Powers, and Constants.
- **Matrix Calculator (New v3.1)**: Perform operations (Add, Mul, Det, Inv) on matrices up to 5x5.
- **Statistics (New v3.1)**: Calculate Mean, Median, Mode, Variance, and Standard Deviation.
- **Currency Converter**: Live exchange rates for 10+ major currencies via API.
- **Time Tools**: World clock and time difference calculator.
- **Unit Converter**: 7 Major Categories (Length, Mass, Temp, etc.) with history integration.
- **Graphing Mode**: Visualize mathematical functions (`y=f(x)`) with interactive zoom and pan.

### 2. 🤖 Smart Input
- **Voice Input**: Speak your calculations (e.g., "Five plus two") using the microphone button.
- **Input Parsing**: Handles complex string expressions and parentheses.

### 3. 🎨 UI/UX & Customization
- **4 Distinct Design Systems**: `Modern`, `Retro`, `Cyberpunk`, `Minimal`, `Neobrutalism`, `Glassmorphism`.
- **Bilingual Support**: Instant toggle between **English (LTR)** and **Persian (RTL)**.
- **Theme Engine**: 5 Color Accents + Dark/Light Mode.
- **Fluid Animations**: Powered by `Framer Motion`.

### 4. ⚡ Technical capabilities
- **PWA Ready**: Installable on iOS, Android, and Desktop. Works offline (except live currency rates).
- **Data Management**: Export and Import your settings and history to JSON.
- **Responsive**: Optimized layout for Mobile, Tablet, and Desktop.

---

## 🛠 Tech Stack (تکنولوژی‌های مورد استفاده)

- **Frontend Core**: React 18, TypeScript, Vite.
- **Styling**: Tailwind CSS.
- **Animation**: Framer Motion.
- **Visualization**: HTML5 Canvas (Custom implementation).
- **Deployment**: GitHub Pages.

---

## 📂 Project Structure

```bash
/
├── components/      # UI Components (Calculator, Matrix, Statistics...)
├── data/            # Static Configurations (Locales, Keypad Layouts)
├── docs/            # User Guides (EN/FA)
├── services/        # Core Logic (Math, Matrix, Stats)
├── types.ts         # TypeScript Interfaces
└── App.tsx          # Main Application Controller
```

---

## 🚀 Installation & Development

To run this project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ali-F-Harandi/Awesome-Calculator.git
   cd Awesome-Calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by Ali F. Harandi**