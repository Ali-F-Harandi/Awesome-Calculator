# Change Log (لیست تغییرات)

All notable changes to this project will be documented in this file.
تمامی تغییرات قابل توجه این پروژه در این فایل مستند خواهد شد.

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
  (پشتیبانی سراسری کیبورد: تایپ اعداد بدون نیاز به کلیک روی فیلد ورودی.)
- **Smart Clipboard**: Copy results with a button and paste expressions using `Ctrl+V`.
  (کلیپ‌بورد هوشمند: کپی نتایج با دکمه و جایگذاری عبارات با `Ctrl+V`.)
- **Haptic/Audio Feedback**: Added click sounds and vibration feedback (Toggleable in Settings).
  (بازخورد صوتی/لمسی: اضافه شدن صدای کلیک و لرزش با قابلیت تنظیم.)

## [1.4.2.1]
### Fixed (اصلاح شده)
- **UI Clipping**: Fixed an issue where the bottom colored bar and the history overlay (in overlay mode) did not respect the calculator's rounded corners. Added `overflow-hidden` to the main container.
  (اصلاح برش رابط کاربری: رفع مشکل بیرون زدگی نوار رنگی پایین و پنل تاریخچه از گوشه‌های گرد ماشین حساب.)

## [1.4.2]
### Fixed (اصلاح شده)
- **Calculator Stretcing**: Fixed a layout bug where the calculator would stretch vertically when the history list grew long. The history panel now scrolls independently while matching the calculator's height.

## [1.4.1]
### Fixed (اصلاح شده)
- **History Scroll**: Fixed an issue where the sidebar history would grow indefinitely.

## [1.4.0]
### Added (اضافه شده)
- **Split View History**: Added an option to view history in a side panel alongside the calculator.
- **History Settings**: Toggle between Overlay and Sidebar modes in settings.

## [1.3.0]
### Added (اضافه شده)
- **Calculation History (تاریخچه محاسبات)**: Automatically saves successful calculations.
- **Persistent Storage**: History is saved in LocalStorage.

## [1.2.0]
### Added (اضافه شده)
- **Scientific Functions (توابع علمی)**: Square Root (√), Power (^), Factorial (!), Absolute Value (|x|).
- **Design Systems**: Modern, Retro, Cyberpunk, Minimal styles.
- **Quick Actions**: Language and Theme toggles on main screen.

## [1.1.0]
### Added (اضافه شده)
- **Settings Panel**: Manage application settings.
- **Advanced Theming**: Change primary accent colors.

## [1.0.0]
### Initial Release (انتشار اولیه)
- Basic Calculator functionality.
- Bilingual Support.
