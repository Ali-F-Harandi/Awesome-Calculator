# Project Roadmap (نقشه راه پروژه)

This document outlines the future development plan for Awesome Calculator.
این سند برنامه توسعه آینده پروژه ماشین حساب پیشرفته را ترسیم می‌کند.

---

## ✅ Phase 1: Enhanced UX & Interaction (v1.5.0) - [COMPLETED]
**Focus:** Usability, Keyboard, and Clipboard.
**تمرکز:** کاربردپذیری، کیبورد و کلیپ‌بورد.

1.  **Global Keyboard Support (پشتیبانی سراسری کیبورد)**
    *   [x] Remove focus dependency on the input field.
    *   [x] Add global event listener (`window.addEventListener('keydown')`).
    *   [x] Map physical keys (Enter, Esc, Backspace, Numbers) to calculator functions.

2.  **Smart Clipboard (کلیپ‌بورد هوشمند)**
    *   [x] Add "Copy Result" button/icon next to the result preview.
    *   [x] Allow pasting numbers/expressions from external sources directly into the calculator via `Ctrl+V`.

3.  **Haptic/Audio Feedback (بازخورد لمسی/صوتی)**
    *   [x] Add a subtle "click" sound (toggleable in settings).
    *   [x] Add vibration (Haptic API) for mobile devices (toggleable).

---

## ✅ Phase 2: Core Engine & Security (v1.6.0) - [COMPLETED]
**Focus:** Removing `new Function` and adding Memory.
**تمرکز:** حذف `new Function` و افزودن حافظه.

1.  **Custom Math Parser (پارسر ریاضی اختصاصی)**
    *   [x] Implement **Shunting Yard Algorithm**.
    *   [x] Support operator precedence (PEMDAS).
    *   [x] Replace `evaluateExpression` service to use the new parser instead of `new Function`.
    *   [x] **Benefit:** 100% Security (No code injection risk).

2.  **Memory Functions (توابع حافظه)**
    *   [x] Add standard memory buttons: `MC` (Clear), `MR` (Recall), `M+` (Add), `M-` (Subtract).
    *   [x] Display a small indicator (e.g., "M") on the screen when memory is stored.

3.  **Advanced Error Handling (مدیریت خطای پیشرفته)**
    *   [x] Detect specific errors: "Division by Zero", "Unclosed Parenthesis", "Invalid Domain".
    *   [x] Show descriptive error messages instead of generic "Error".

---

## 📱 Phase 3: PWA & Offline Capability (v1.7.0)
**Focus:** Native app experience.
**تمرکز:** تجربه اپلیکیشن بومی.

1.  **Manifest File**
    *   [ ] Create `manifest.json` with app icons, name, and theme colors.
    *   [ ] Ensure "Standalone" display mode.

2.  **Service Worker**
    *   [ ] Register a Service Worker using generic SW or Vite PWA plugin.
    *   [ ] Cache assets (HTML, CSS, JS, Fonts) for offline usage.
    *   [ ] Implement "Update Available" notification.

3.  **Install Prompt**
    *   [ ] Add a custom "Install App" button in Settings if the browser supports `beforeinstallprompt`.

---

## 🎨 Phase 4: UI Polish & Testing (v1.8.0)
**Focus:** Visuals and Stability.
**تمرکز:** جلوه‌های بصری و پایداری.

1.  **Dual-Line Display (نمایشگر دو خطی)**
    *   [ ] Top line: Full formula (small font).
    *   [ ] Bottom line: Current result (large font).

2.  **Micro-Interactions**
    *   [ ] Add framer-motion or CSS transitions for smoother panel opening/closing.
    *   [ ] Improve button press animations.
    *   [ ] Enhanced Glassmorphism for "Modern" and "Dark" themes.

3.  **Unit Testing**
    *   [ ] Set up Vitest.
    *   [ ] Write test cases for the Math Parser (edge cases, floating point precision).

---

## 📂 Data Structure Plan (برنامه ساختار داده)

- **Config**: `data/config.ts`.
- **Locales**: `data/locales.ts`.
- **Logic**: `services/mathService.ts` (Now contains Tokenizer & Parser).