# Awesome Calculator (ماشین حساب پیشرفته)

[![Deploy Status](https://img.shields.io/badge/Deploy-GitHub%20Pages-blue?style=flat-square)](https://Ali-F-Harandi.github.io/Awesome-Calculator/)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/version-1.5.1-orange?style=flat-square)](./CHANGELOG.md)

A bilingual (English/Persian), responsive, and robust calculator application built with React, TypeScript, and Tailwind CSS.
این یک پروژه ماشین حساب دو زبانه (انگلیسی/فارسی)، ریسپانسیو و پیشرفته است که با ریکت، تایپ‌اسکریپت و تیلویند ساخته شده است.

## 🚀 Live Demo (دموی زنده)
[Click here to view the app / برای مشاهده کلیک کنید](https://Ali-F-Harandi.github.io/Awesome-Calculator/)

## 🛠 Features (ویژگی‌ها)
- **Calculation History**: View past calculations and results with persistent storage.
  (تاریخچه محاسبات: مشاهده محاسبات و نتایج قبلی با ذخیره‌سازی پایدار.)
- **Scientific Functions**: Support for Square Root (√), Power (^), Factorial (!), and Absolute Value (|x|).
  (توابع علمی: پشتیبانی از جذر، توان، فاکتوریل و قدر مطلق.)
- **Multi-Style Design**: Choose between Modern, Retro, Cyberpunk, and Minimal designs.
  (طراحی چند سبکی: انتخاب بین طرح‌های مدرن، رترو، سایبرپانک و مینیمال.)
- **Bilingual Support**: Instant switch between English (LTR) and Persian (RTL).
  (پشتیبانی دو زبانه: تغییر آنی بین انگلیسی و فارسی)
- **Smart Interactions**: Global keyboard support, copy/paste functionality, and haptic feedback.
  (تعاملات هوشمند: پشتیبانی از کیبورد، کپی/پیست و بازخورد لمسی.)
- **Quick Actions**: Access language and theme toggles directly from the main screen.
  (دسترسی سریع: دسترسی به تغییر زبان و تم مستقیماً از صفحه اصلی.)
- **Safe Evaluation**: Uses a custom sanitizer before evaluation.
- **Persistence**: Remembers your settings after closing the browser.

[View Full Change Log / مشاهده لیست کامل تغییرات](./CHANGELOG.md)

## 📦 Architecture (معماری)
The project follows a **Component-Based Architecture**:
- `data/`: Holds static configuration (keypad layout) and translations.
- `services/`: Pure logic functions (math evaluation).
- `components/`: UI elements (Presentational components).