# Change Log (لیست تغییرات)

All notable changes to this project will be documented in this file.
تمامی تغییرات قابل توجه این پروژه در این فایل مستند خواهد شد.

## [1.6.0]
### Added (اضافه شده)
- **Memory Functions (حافظه)**: Added MC, MR, M+, M- buttons and persistent memory storage.
  (توابع حافظه: اضافه شدن دکمه‌های مدیریت حافظه و ذخیره‌سازی پایدار.)
- **Secure Math Parser**: Replaced `new Function` with a custom **Shunting Yard Algorithm** parser. This prevents code injection risks and improves calculation control.
  (پارسر ریاضی امن: جایگزینی `new Function` با الگوریتم اختصاصی Shunting Yard برای افزایش امنیت و کنترل محاسبات.)
- **Advanced Error Handling**: Specific error messages for "Division by Zero", "Unclosed Parenthesis", etc.
  (مدیریت خطای پیشرفته: نمایش پیام‌های خطای اختصاصی مانند تقسیم بر صفر.)

## [1.5.1]
### Changed (تغییر یافته)
- **Theme-Specific Sounds**: Replaced generic beep with unique sounds for each design style.
  (صداهای مخصوص تم: جایگزینی صدای بوق عمومی با صداهای منحصر به فرد برای هر سبک طراحی.)
  - *Modern*: Soft pop/tap.
  - *Retro*: 8-bit square wave beep.
  - *Cyberpunk*: Futuristic laser-like slide.
  - *Minimal*: Very short, quiet tick.
- **CI/CD**: Added automatic GitHub Release generation with downloadable build artifacts when a tag is pushed.
  (انتشار خودکار: اضافه شدن قابلیت ساخت ریلیز گیت‌هاب و آپلود فایل‌های بیلد هنگام پوش کردن تگ.)

## [1.5.0]
### Added (اضافه شده)
- **Global Keyboard Support**: Type numbers and operations without clicking the input field.
- **Smart Clipboard**: Copy results with a button and paste expressions using `Ctrl+V`.
- **Haptic/Audio Feedback**: Added click sounds and vibration feedback (Toggleable in Settings).

## [1.4.2]
### Fixed (اصلاح شده)
- **UI & Layout**: Fixed layout bugs related to history panel and mobile view.

## [1.3.0]
### Added (اضافه شده)
- **Calculation History**: Automatically saves successful calculations in LocalStorage.

## [1.2.0]
### Added (اضافه شده)
- **Scientific Functions**: Square Root (√), Power (^), Factorial (!), Absolute Value (|x|).
- **Design Systems**: Modern, Retro, Cyberpunk, Minimal styles.

## [1.0.0]
### Initial Release (انتشار اولیه)
- Basic Calculator functionality.
- Bilingual Support.
