

# Change Log (لیست تغییرات)

All notable changes to this project will be documented in this file.
تمامی تغییرات قابل توجه این پروژه در این فایل مستند خواهد شد.

## [3.6.0.0] - Phase 14: Camera Math (Part 1) (دوربین ریاضی - بخش اول)
### Added (اضافه شده)
- **Camera Mode (دوربین ریاضی)**: A new mode that allows users to access their device camera.
- **Image Capture**: Users can capture a frame from the video stream to be used for math processing.
- **Permissions**: Added necessary metadata for camera permissions in PWA manifest.
- **UI Implementation**: Dedicated UI for camera stream, capture, retake, and placeholder for processing.

## [3.5.0.0] - Phase 13: The AI Era (عصر هوش مصنوعی)
### Added (اضافه شده)
- **AI Math Assistant (دستیار ریاضی هوشمند)**: A new mode featuring integration with Google Gemini AI.
- **Smart Chat Interface**: Ask math questions, get step-by-step solutions, and definitions.
- **API Key Configuration**: Users can now securely input their own Google Gemini API Key in the Settings menu to enable AI features.
- **Settings Update**: Added a secure password field for API keys in the settings modal.

## [3.4.2.0] - Sidebar Optimization (بهینه‌سازی نوار کناری)
### Improved (بهبود یافته)
- **Sidebar Grid**: Changed desktop sidebar from a long list to a 2-column grid layout for better space utilization.
- **Responsive Layout**: Increased desktop max-width to accommodate the new sidebar design without breaking the layout.

## [3.4.0.0] - Phase 12: Education & Gamification (آموزش و بازی‌سازی)
### Added (اضافه شده)
- **Learning Center (مرکز آموزش)**: A new mode featuring interactive lessons for Algebra, Geometry, and Physics. Includes formulas, definitions, and examples.
- **Math Game (بازی ریاضی)**: "Speed Math" challenge mode. Solve randomly generated arithmetic problems (`+`, `-`, `*`) against a 60-second timer.
- **Scoring System**: Tracks your score and saves your High Score locally.
- **Interactive UI**: Visual feedback for correct/incorrect answers in the game.

## [3.3.0.0] - Phase 11: Engineering & Pro Tools (ابزارهای مهندسی و حرفه‌ای)
### Added (اضافه شده)
- **Programmer Mode (برنامه‌نویسی)**:
    - Base Conversion: HEX, DEC, OCT, BIN (instant switching).
    - Bitwise Operations: AND, OR, XOR, NOT, NAND, NOR.
    - Specialized Keypad: Disabled keys based on active base.
- **Engineering Calculator (مهندسی)**:
    - **Circuits**: Series/Parallel resistor calculator.
    - **Mechanics**: Force (F=ma) and Kinetic Energy calculations.
    - **Thermodynamics**: Heat Transfer (Q=mcΔT).
- **Geometry Calculator (هندسه)**:
    - **2D Shapes**: Area/Perimeter for Circle, Rectangle, Triangle.
    - **3D Shapes**: Volume/Surface for Sphere, Cylinder, Cone.

## [3.2.1.0] - Smooth UI Animation (انیمیشن نرم رابط کاربری)
### Improved (بهبود یافته)
- **Layout Animation (انیمیشن چیدمان)**: Added smooth vertical resizing animations to the main calculator container. The app now expands/shrinks fluidly when switching modes or adding content (like functions in Graphing mode) instead of jumping instantly.

## [3.2.0.0] - Phase 10: Visualization 2.0 (بصری‌سازی پیشرفته)
### Added (اضافه شده)
- **Multi-Plotting (رسم همزمان)**: Added support for plotting multiple functions on the same graph simultaneously with distinct colors.
- **Polar Coordinates (مختصات قطبی)**: Added a new graphing mode to plot functions in the form of `r = f(θ)`.
- **Export Graph (خروجی نمودار)**: Added a camera button to save the current graph view as a PNG image.
- **Improved Engine**: Upgraded the math engine to support `theta` and `t` variables for advanced plotting.

## [3.1.1.1] - UI Fixes (اصلاحات رابط کاربری)
### Fixed (اصلاح شده)
- **Matrix Layout (چیدمان ماتریس)**: Changed matrix input layout from side-by-side to vertical stack to ensure fields are fully visible and usable on all screen sizes, especially when using 5x5 matrices.
- **Dimension Inputs**: Increased the size of the row/column inputs to make them clearly readable.

## [3.1.1.0] - UI & UX Polish (بهبود تجربه کاربری)
### Fixed (اصلاح شده)
- **Matrix Inputs (ورودی ماتریس)**: Fixed input fields being too small or misaligned. Inputs are now responsive and clearly visible on all devices.
- **Tab Reordering (ترتیب تب‌ها)**: Reorganized the mode switcher tabs into logical groups (Standard/Scientific, Advanced Math, Tools) for better navigation.

### Added (اضافه شده)
- **Statistics Input (ورودی آمار)**: Added a single-entry field and an "Add" button to the Statistics mode, allowing users to input numbers one by one in addition to the bulk text area.

## [3.1.0.0] - Phase 9: Advanced Math (هسته ریاضی پیشرفته)
### Added (اضافه شده)
- **Matrix Calculator (ماتریس)**: Added a full-featured matrix calculator.
    - Operations: Addition (`A+B`), Subtraction (`A-B`), Multiplication (`A×B`).
    - Linear Algebra: Determinant (`det`), Inverse (`inv`), Transpose (`trans`).
    - Dynamic sizing: Create matrices from 1x1 up to 5x5.
- **Statistics Calculator (آمار)**: Added a tool for statistical analysis of datasets.
    - Inputs: Accepts comma-separated lists of numbers.
    - Results: Calculates Mean, Median, Mode, Variance, Standard Deviation, Min/Max, Sum, and Count.

## [3.0.0.0] - Phase 8: Connectivity & Intelligence (اتصال و هوشمندی)
### Added (اضافه شده)
- **Currency Converter (تبدیل ارز)**: New mode fetching real-time exchange rates via API. Supports conversion against a base currency for 10+ major world currencies.
- **Time Tools (ابزار زمان)**: Added World Clock and Time Difference calculator.
- **Voice Input (ورودی صوتی)**: Added a microphone button to the display. You can now speak calculations (e.g., "Two plus two").
- **Data Management (مدیریت داده)**: Added Import/Export functionality in Settings. You can now backup your history and preferences to a JSON file.

## [2.5.1.3] - UI Polish (بهبود رابط کاربری)
### Fixed (اصلاح شده)
- **Color Bar**: Fixed the bottom color bar width issue on modern themes.
- **Theme Layout**: Fixed styling conflicts in Retro and Cyberpunk sidebar containers.

## [2.5.0.1] - Glass Fix & Sounds (اصلاح شیشه‌ای و صداها)
### Fixed (اصلاح شده)
- **Glass Theme Visibility**: Fixed an issue where text was invisible in Light Mode on the Glassmorphism theme by improving contrast and adding a gradient background.
- **Glass Background**: Added a dedicated colorful gradient background for the Glass theme to enhance the blur effect.

### Added (اضافه شده)
- **Theme Sounds**: Added specific click sounds for new themes:
    - **Neobrutalism**: Mechanical switch sound.
    - **Glass**: Crystal/Glass tap sound.

## [2.5.0.0] - Phase 6: The Design Revolution (انقلاب طراحی)
### Added (اضافه شده)
- **New Theme: Neobrutalism (نئوبروتالیسم)**: A trendy, high-contrast, bold design style featuring hard shadows, thick borders, and vibrant colors inspired by pop-art.
- **New Theme: Glassmorphism (شیشه‌ای)**: A futuristic, semi-transparent design with frosted glass effects (blur), glows, and floating elements.
- **Enhanced UI**: Components like buttons and displays now fully adapt to these complex new design systems with custom animations and interactions.

## [2.4.1.1] - Solver Polish (بهبودهای حل‌کننده)
### Changed (تغییرات)
- **System 3x3 History**: Now saves the full set of 3 equations in the history log instead of just a label.
- **Pythagoras UI**: Added a helpful instruction text to remind users to leave one field empty for the calculation to work.

## [2.4.1] - Equation Solver & History Fixes (اصلاحات حل معادلات)
### Fixed (اصلاح شده)
- **Equation History**: Fixed 3-variable system results not saving to history.
- **Equation Formatting**: 2-variable system now shows actual equations (e.g., `2x+y=5`) in history instead of "Sys2x2".
- **Pythagoras Logic**: Fixed issue where the calculator would return "Invalid" if a field was left empty or 0. It now correctly identifies the missing variable.

## [2.4.0] - Phase 5 Complete: Advanced Solver (فاز ۵ تکمیل شد: حل‌کننده پیشرفته)
### Added (اضافه شده)
- **Compact UI Tabs**: Redesigned tab navigation in `ModeSwitcher` and `EquationSolver`. Tabs now use a flexible "Expand on Active" design to eliminate horizontal scrolling.
- **Linear Solver**: Added support for solving linear equations (`ax + b = c`).
- **Geometry Solver**: Added **Pythagorean Theorem** calculator (solve for side A, B, or Hypotenuse C).
- **Physics Solver**: Added **Ohm's Law** calculator (solve for Voltage, Current, or Resistance).
- **Expanded Translations**: Added Persian/English translations for new physics and geometry terms.

### Changed (تغییرات)
- **UX Improvement**: Switched from scrollable tabs to a single-row flex layout for better accessibility on mobile devices.

## [2.3.0] - Phase 4: Graphing Calculator (فاز ۴: ماشین حساب نموداری)
### Added (اضافه شده)
- **Native Graphing Engine**: Implemented a lightweight, custom HTML5 Canvas engine for plotting functions. No external heavy libraries.
- **Graphing Mode**: Plot mathematical functions (e.g., `x^2`, `sin(x)`) with real-time updates.
- **Interactive Controls**: Support for Zooming (Mouse Wheel/Scroll) and Panning (Drag) on the graph.
- **User Guides**: Comprehensive documentation in English and Persian (`USER_GUIDE_EN.md`, `USER_GUIDE_FA.md`).

### Fixed (اصلاح شده)
- **Build Stability**: Removed `function-plot` dependency to resolve Vite/Rollup build errors and `React #31` conflicts.
- **Performance**: Graph rendering is now faster and fully theme-aware (supports all 4 design styles).

## [2.2.2] - Conversion History (تاریخچه تبدیل)
### Added (اضافه شده)
- **Save to History**: Added a button in Converter mode to save the current conversion result to the main history log.
- **Conversion Formatting**: History items now properly display conversion logic (e.g., `100 m → km`) alongside the result.
- **Feedback**: Added a visual confirmation (green checkmark) when saving a conversion.

## [2.2.1] - UI Improvements (بهبود رابط کاربری)
### Changed (تغییرات)
- **Converter Layout**: Category tabs now display in a compact 2-row grid instead of a horizontal scroll, significantly improving accessibility on mobile.
- **Swap Functionality**: Added an interactive button to swap "From" and "To" units instantly.
- **Documentation**: Completely overhauled `README.md` for a professional presentation including tech stack and project structure.

## [2.2.0] - Phase 3: The Converter Update (فاز ۳: مبدل واحد)
### Added (اضافه شده)
- **Unit Converter Mode**: Integrated comprehensive converter mode into the main app.
- **Base Conversion**: Added Binary (2), Octal (8), Decimal (10), and Hexadecimal (16) conversions.
- **Speed Units**: Added m/s, km/h, mph, knot, ft/s.
- **Major Categories**: Length, Mass, Temperature, Data, Time, Speed, Base.
- **Fluid UI**: Dedicated converter interface with specific keypad behaviors (e.g. Hex input).

## [2.1.5] - Phase 2.5: The Complete Scientific Update (تکمیل ماشین حساب مهندسی)
### Added (اضافه شده)
- **Comprehensive Scientific Functions**: Added missing scientific buttons to the keypad.
- **Hyperbolic Trigonometry**: `sinh`, `cosh`, `tanh`, `asinh`, `acosh`, `atanh`.
- **Advanced Roots & Powers**: `∛` (Cube Root), `x²`, `x³`, `10˟`.
- **Random**: Added `Rand` function.
- **Layout Optimization**: Reorganized scientific keypad for better ergonomics.

## [2.1.0] - Scientific Calculator Phase 2 (فاز ۲: شروع حالت مهندسی)
### Added (اضافه شده)
- **Scientific Mode**: Activated the Scientific tab with basic functions.
- **Trigonometry**: Added `sin`, `cos`, `tan` and their inverses (`asin`, `acos`, `atan`).
- **Angle Modes**: Added toggle for Degrees (DEG) vs Radians (RAD).
- **Logarithms**: Added `log` (base 10), `ln` (base e), and Euler's number `e`.
- **Math Engine**: Upgraded parsing engine to handle functions and precedence.

## [2.0.0] - The Super App Update (فاز ۱: سوپر اپلیکیشن)
### Added (اضافه شده)
- **Animation Engine**: Integrated `Framer Motion` for smooth transitions between modes.
- **Mode Switcher**: Added the tab bar to switch between Standard, Scientific, and Converter.
- **Architecture Overhaul**: Refactored the entire codebase to support multiple calculator "engines".
- **New Themes**: Refined "Cyberpunk" and "Retro" styles.

## [1.5.0] - UI Polish & PWA
- **PWA**: Added `manifest.json` and Service Workers for offline support and installation.
- **Responsive Design**: Optimized layout for landscape mode on tablets and mobile phones.
- **Clipboard**: Added Copy/Paste functionality.

## [1.0.0] - Initial Release (انتشار اولیه)
- **Basic Arithmetic**: Addition, Subtraction, Multiplication, Division.
- **History**: Basic history overlay.
- **Theming**: Dark/Light mode and color accents.
- **Bilingual**: Full English and Persian support.
