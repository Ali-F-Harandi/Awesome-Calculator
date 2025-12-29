

import { ITranslations, Language } from '../types';
import { APP_VERSION } from './config';

// English Translations
const en: ITranslations = {
  title: "Awesome Calculator",
  placeholder: "Type or click...",
  error: "Error",
  errors: {
    divZero: "Division by Zero",
    invalidFormat: "Invalid Format",
    openParen: "Unclosed Parenthesis"
  },
  clear: "AC",
  delete: "⌫",
  calculate: "=",
  footerName: "Ali F. Harandi",
  footerRole: `Awesome Calculator Project v${APP_VERSION}`,
  history: "History",
  settings: "Settings",
  dataManagement: "Data Management",
  exportData: "Export Data (JSON)",
  importData: "Import Data",
  dataCopied: "Data copied to clipboard!",
  dataImported: "Data imported successfully!",
  themeColor: "Theme Color",
  designStyle: "Design Style",
  historyMode: "History View",
  sound: "Sound Effects",
  vibration: "Haptic Feedback",
  copied: "Copied!",
  apiKey: "Gemini API Key",
  apiKeyPlaceholder: "Enter your Google Gemini API Key",
  apiKeyHelp: "Your key is stored locally in your browser.",
  modes: {
    overlay: "Overlay (Modal)",
    sidebar: "Split View (Side)"
  },
  appModes: {
    standard: "Standard",
    scientific: "Scientific",
    converter: "Converter",
    graphing: "Graphing",
    solver: "Solver",
    finance: "Finance",
    currency: "Currency",
    time: "Time Tools",
    matrix: "Matrix",
    statistics: "Statistics",
    programmer: "Programmer",
    engineering: "Engineering",
    geometry: "Geometry",
    learning: "Learning",
    game: "Math Game",
    ai: "AI Assistant",
    camera: "Camera Math"
  },
  darkMode: "Dark Mode",
  language: "Language",
  close: "Close",
  selectColor: "Select Accent Color",
  styles: {
    modern: "Modern",
    retro: "Retro",
    cyberpunk: "Cyberpunk",
    minimal: "Minimal",
    neobrutalism: "Neo-Brutalism",
    glass: "Glassmorphism"
  },
  clearHistory: "Clear History",
  noHistory: "No history yet",
  historyTooltip: "View History",
  memoryTooltip: "Memory Stored",
  installApp: "Install Application",
  install: "Install App",
  installed: "App Installed",
  comingSoon: "Coming Soon",
  voice: {
      listening: "Listening...",
      error: "Could not hear you.",
      notSupported: "Voice not supported in this browser."
  },
  graphing: {
      placeholder: "Function...",
      help: "Drag to pan, Scroll to zoom. Use 'x' or 'theta'.",
      addFunction: "Add Function",
      modes: {
          cartesian: "Cartesian (y=f(x))",
          polar: "Polar (r=f(θ))"
      },
      export: "Export Image"
  },
  solver: {
      tabs: {
          linear: "Linear",
          quadratic: "Quadratic",
          cubic: "Cubic",
          system2: "System 2x2",
          system3: "System 3x3",
          pythagoras: "Pythagoras",
          ohms: "Ohm's Law"
      },
      coeffs: "Coefficients",
      solve: "Solve",
      roots: "Roots",
      discriminant: "Discriminant (Δ)",
      noRealRoots: "No Real Roots",
      infiniteSolutions: "Infinite Solutions",
      noSolution: "No Solution",
      pythagorasHelp: "Enter exactly 2 values. Leave the target empty.",
      sides: {
          a: "Side A",
          b: "Side B",
          c: "Hypotenuse C"
      },
      physics: {
          v: "Voltage (V)",
          i: "Current (I)",
          r: "Resistance (Ω)"
      },
      results: { x: "x =", y: "y =", z: "z =", generic: "Result =" }
  },
  finance: {
    tabs: {
      loan: "Loan",
      discount: "Discount",
      bmi: "BMI"
    },
    loan: {
      principal: "Amount ($)",
      rate: "Interest Rate (%)",
      years: "Duration (Years)",
      monthlyPayment: "Monthly Payment",
      totalInterest: "Total Interest"
    },
    discount: {
      price: "Original Price",
      discount: "Discount (%)",
      finalPrice: "Final Price",
      saved: "You Save"
    },
    bmi: {
      weight: "Weight (kg)",
      height: "Height (cm)",
      result: "BMI Score",
      status: "Status",
      statuses: {
        underweight: "Underweight",
        normal: "Normal Weight",
        overweight: "Overweight",
        obese: "Obesity"
      }
    }
  },
  converter: {
    from: "From",
    to: "To",
    length: "Length",
    mass: "Mass",
    temperature: "Temp",
    data: "Data",
    time: "Time",
    speed: "Speed",
    base: "Base",
    addToHistory: "Save to History",
    units: {
        m: "Meter (m)",
        km: "Kilometer (km)",
        cm: "Centimeter (cm)",
        mm: "Millimeter (mm)",
        mile: "Mile",
        yard: "Yard",
        foot: "Foot",
        inch: "Inch",
        kg: "Kilogram (kg)",
        g: "Gram (g)",
        mg: "Milligram (mg)",
        ton: "Metric Ton",
        lb: "Pound (lb)",
        oz: "Ounce (oz)",
        C: "Celsius (°C)",
        F: "Fahrenheit (°F)",
        K: "Kelvin (K)",
        bit: "Bit",
        byte: "Byte",
        kb: "Kilobyte (KB)",
        mb: "Megabyte (MB)",
        gb: "Gigabyte (GB)",
        tb: "Terabyte (TB)",
        sec: "Second",
        min: "Minute",
        hour: "Hour",
        day: "Day",
        week: "Week",
        year: "Year",
        // Speed
        mps: "Meter/sec (m/s)",
        kph: "Km/hour (km/h)",
        mph: "Mile/hour (mph)",
        knot: "Knot",
        fps: "Foot/sec (ft/s)",
        // Base
        dec: "Decimal (10)",
        bin: "Binary (2)",
        oct: "Octal (8)",
        hex: "Hexadecimal (16)"
    }
  },
  currency: {
      base: "Base Currency",
      update: "Update Rates",
      lastUpdate: "Last Update",
      loading: "Loading rates...",
      error: "Failed to fetch rates."
  },
  time: {
      worldClock: "World Clock",
      diff: "Time Difference",
      current: "Current Time",
      selectZone: "Select Timezone",
      timeDiff: "Time Diff",
      ahead: "ahead",
      behind: "behind"
  },
  matrix: {
    dims: "Dimensions",
    set: "Set",
    ops: {
        add: "A + B",
        sub: "A - B",
        mul: "A × B",
        det: "Det(A)",
        inv: "Inv(A)",
        trans: "Trans(A)"
    },
    matrixA: "Matrix A",
    matrixB: "Matrix B",
    result: "Result",
    error: "Invalid Operation"
  },
  statistics: {
      inputPlaceholder: "Enter numbers separated by comma (e.g., 10, 20, 30, 45)",
      calc: "Calculate Statistics",
      clear: "Clear Data",
      add: "+ Add",
      results: {
          mean: "Mean",
          median: "Median",
          mode: "Mode",
          stdDev: "Std Dev (σ)",
          variance: "Variance",
          sum: "Sum",
          count: "Count (n)",
          min: "Min",
          max: "Max"
      }
  },
  programmer: {
      hex: "HEX",
      dec: "DEC",
      oct: "OCT",
      bin: "BIN",
      ops: {
          and: "AND",
          or: "OR",
          xor: "XOR",
          not: "NOT",
          nand: "NAND",
          nor: "NOR",
          shl: "LSH",
          shr: "RSH"
      }
  },
  engineering: {
      tabs: {
          circuits: "Circuits",
          mechanics: "Mechanics",
          thermo: "Thermo"
      },
      circuits: {
          series: "Series Resistors",
          parallel: "Parallel Resistors",
          calc: "Calculate",
          r1: "R1 (Ω)",
          r2: "R2 (Ω)",
          result: "Total R"
      },
      mechanics: {
          force: "Force (F=ma)",
          mass: "Mass (kg)",
          accel: "Accel (m/s²)",
          ke: "Kinetic Energy",
          velocity: "Velocity (m/s)",
          energy: "Energy (J)"
      },
      thermo: {
          heat: "Heat Transfer",
          shc: "c (J/kg°C)",
          deltaT: "ΔT (°C)",
          q: "Q (J)"
      }
  },
  geometry: {
      tabs: {
          d2: "2D Shapes",
          d3: "3D Shapes"
      },
      shapes: {
          circle: "Circle",
          rectangle: "Rectangle",
          triangle: "Triangle",
          sphere: "Sphere",
          cylinder: "Cylinder",
          cone: "Cone"
      },
      inputs: {
          radius: "Radius (r)",
          width: "Width (w)",
          height: "Height (h)",
          base: "Base (b)",
          side: "Side (a)"
      },
      results: {
          area: "Area",
          perimeter: "Perimeter",
          volume: "Volume",
          surface: "Surface Area"
      }
  },
  learning: {
      title: "Learning Center",
      topics: {
          algebra: "Algebra",
          geometry: "Geometry",
          physics: "Physics"
      },
      back: "Back to Topics"
  },
  game: {
      title: "Speed Math",
      start: "Start Game",
      score: "Score",
      highScore: "High Score",
      time: "Time",
      gameOver: "Game Over",
      playAgain: "Play Again",
      correct: "Correct!",
      wrong: "Wrong!"
  },
  ai: {
      title: "AI Math Assistant",
      placeholder: "Ask a math question...",
      send: "Send",
      thinking: "Thinking...",
      error: "Something went wrong. Check your API Key.",
      setKey: "Set API Key",
      noKeyMessage: "To use the AI Assistant, you must provide your own Google Gemini API Key in Settings.",
      goToSettings: "Open Settings"
  },
  camera: {
      title: "Camera Math",
      start: "Start Camera",
      capture: "Capture",
      retake: "Retake",
      process: "Process (Coming Soon)",
      permissionDenied: "Camera access denied. Please enable permissions.",
      instruction: "Take a picture of a math problem"
  }
};

// Persian Translations
const fa: ITranslations = {
  title: "ماشین حساب پیشرفته",
  placeholder: "تایپ کنید...",
  error: "خطا",
  errors: {
    divZero: "تقسیم بر صفر",
    invalidFormat: "فرمت نامعتبر",
    openParen: "پرانتز باز مانده"
  },
  clear: "C",
  delete: "⌫",
  calculate: "=",
  footerName: "علی فـ. هرندی",
  footerRole: `پروژه ماشین حساب نسخه ${APP_VERSION}`,
  history: "تاریخچه",
  settings: "تنظیمات",
  dataManagement: "مدیریت داده‌ها",
  exportData: "خروجی گرفتن (JSON)",
  importData: "وارد کردن داده",
  dataCopied: "داده‌ها در کلیپ‌بورد کپی شد!",
  dataImported: "داده‌ها با موفقیت وارد شد!",
  themeColor: "رنگ تم",
  designStyle: "سبک طراحی",
  historyMode: "نحوه نمایش تاریخچه",
  sound: "افکت صوتی",
  vibration: "بازخورد لرزشی",
  copied: "کپی شد!",
  apiKey: "کلید API جمنای",
  apiKeyPlaceholder: "کلید Google Gemini API خود را وارد کنید",
  apiKeyHelp: "کلید شما به صورت محلی در مرورگر ذخیره می‌شود.",
  modes: {
    overlay: "روی صفحه (مودال)",
    sidebar: "کنار صفحه (جداگانه)"
  },
  appModes: {
    standard: "استاندارد",
    scientific: "مهندسی",
    converter: "مبدل واحد",
    graphing: "نمودار",
    solver: "حل معادلات",
    finance: "امور مالی",
    currency: "تبدیل ارز",
    time: "ابزار زمان",
    matrix: "ماتریس",
    statistics: "آمار",
    programmer: "برنامه‌نویسی",
    engineering: "مهندسی پیشرفته",
    geometry: "هندسه",
    learning: "مرکز آموزش",
    game: "بازی ریاضی",
    ai: "دستیار هوش مصنوعی",
    camera: "دوربین ریاضی"
  },
  darkMode: "حالت تاریک",
  language: "زبان برنامه",
  close: "بستن",
  selectColor: "انتخاب رنگ اصلی",
  styles: {
    modern: "مدرن",
    retro: "رترو (قدیمی)",
    cyberpunk: "سایبرپانک",
    minimal: "مینیمال",
    neobrutalism: "نئوبروتالیسم (خلاقانه)",
    glass: "شیشه‌ای (مدرن)"
  },
  clearHistory: "پاک کردن تاریخچه",
  noHistory: "تاریخچه‌ای موجود نیست",
  historyTooltip: "مشاهده تاریخچه",
  memoryTooltip: "حافظه ذخیره شده",
  installApp: "نصب اپلیکیشن",
  install: "نصب برنامه",
  installed: "نصب شده",
  comingSoon: "بزودی",
  voice: {
      listening: "در حال گوش دادن...",
      error: "صدا تشخیص داده نشد.",
      notSupported: "مرورگر شما پشتیبانی نمی‌کند."
  },
  graphing: {
      placeholder: "تابع...",
      help: "جابجایی با کشیدن، زوم با اسکرول. متغیر 'x' یا 'theta'.",
      addFunction: "افزودن تابع",
      modes: {
          cartesian: "دکارتی (y=f(x))",
          polar: "قطبی (r=f(θ))"
      },
      export: "خروجی تصویر"
  },
  solver: {
      tabs: {
          linear: "خطی (Linear)",
          quadratic: "درجه ۲ (Quadratic)",
          cubic: "درجه ۳ (Cubic)",
          system2: "دستگاه ۲ مجهول",
          system3: "دستگاه ۳ مجهول",
          pythagoras: "فیثاغورس (هندسه)",
          ohms: "قانون اهم (فیزیک)"
      },
      coeffs: "ضرایب",
      solve: "حل معادله",
      roots: "ریشه‌ها",
      discriminant: "دلتا (Δ)",
      noRealRoots: "ریشه حقیقی ندارد",
      infiniteSolutions: "بی‌نهایت جواب",
      noSolution: "بدون جواب",
      pythagorasHelp: "دقیقاً دو مقدار را وارد کنید. فیلد مورد نظر را خالی بگذارید.",
      sides: {
          a: "ضلع A",
          b: "ضلع B",
          c: "وتر C"
      },
      physics: {
          v: "ولتاژ (V)",
          i: "جریان (I)",
          r: "مقاومت (Ω)"
      },
      results: { x: "x =", y: "y =", z: "z =", generic: "نتیجه =" }
  },
  finance: {
    tabs: {
      loan: "وام",
      discount: "تخفیف",
      bmi: "شاخص BMI"
    },
    loan: {
      principal: "مبلغ وام (تومان)",
      rate: "نرخ سود (%)",
      years: "مدت بازپرداخت (سال)",
      monthlyPayment: "قسط ماهیانه",
      totalInterest: "کل سود پرداختی"
    },
    discount: {
      price: "قیمت اصلی",
      discount: "درصد تخفیف",
      finalPrice: "قیمت نهایی",
      saved: "سود شما"
    },
    bmi: {
      weight: "وزن (کیلوگرم)",
      height: "قد (سانتیمتر)",
      result: "شاخص BMI",
      status: "وضعیت",
      statuses: {
        underweight: "کمبود وزن",
        normal: "وزن طبیعی",
        overweight: "اضافه وزن",
        obese: "چاقی"
      }
    }
  },
  converter: {
    from: "از واحد",
    to: "به واحد",
    length: "طول",
    mass: "وزن",
    temperature: "دما",
    data: "داده",
    time: "زمان",
    speed: "سرعت",
    base: "مبنا",
    addToHistory: "ذخیره در تاریخچه",
    units: {
        m: "متر (m)",
        km: "کیلومتر (km)",
        cm: "سانتیمتر (cm)",
        mm: "میلیمتر (mm)",
        mile: "مایل",
        yard: "یارد",
        foot: "فوت",
        inch: "اینچ",
        kg: "کیلوگرم (kg)",
        g: "گرم (g)",
        mg: "میلی‌گرم (mg)",
        ton: "تن",
        lb: "پوند (lb)",
        oz: "اونس (oz)",
        C: "سانتی‌گراد (°C)",
        F: "فارنهایت (°F)",
        K: "کلوین (K)",
        bit: "بیت",
        byte: "بایت",
        kb: "کیلوبایت (KB)",
        mb: "مگابایت (MB)",
        gb: "گیگابایت (GB)",
        tb: "ترابایت (TB)",
        sec: "ثانیه",
        min: "دقیقه",
        hour: "ساعت",
        day: "روز",
        week: "هفته",
        year: "سال",
        // Speed
        mps: "متر بر ثانیه (m/s)",
        kph: "کیلومتر بر ساعت",
        mph: "مایل بر ساعت",
        knot: "گره دریایی",
        fps: "فوت بر ثانیه",
        // Base
        dec: "ده‌دهی (Decimal)",
        bin: "دودویی (Binary)",
        oct: "هشت‌هشتی (Octal)",
        hex: "شانزده‌شانزدهی (Hex)"
    }
  },
  currency: {
      base: "ارز پایه",
      update: "بروزرسانی نرخ‌ها",
      lastUpdate: "آخرین آپدیت",
      loading: "دریافت نرخ ارز...",
      error: "خطا در دریافت نرخ."
  },
  time: {
      worldClock: "ساعت جهانی",
      diff: "اختلاف زمانی",
      current: "زمان کنونی",
      selectZone: "انتخاب منطقه زمانی",
      timeDiff: "اختلاف",
      ahead: "جلوتر",
      behind: "عقب‌تر"
  },
  matrix: {
    dims: "ابعاد",
    set: "تایید",
    ops: {
        add: "جمع A+B",
        sub: "تفریق A-B",
        mul: "ضرب A×B",
        det: "دترمینان A",
        inv: "معکوس A",
        trans: "ترانهاده A"
    },
    matrixA: "ماتریس A",
    matrixB: "ماتریس B",
    result: "نتیجه",
    error: "عملیات نامعتبر"
  },
  statistics: {
      inputPlaceholder: "اعداد را با کاما جدا کنید (مثال: 10, 20, 30, 45)",
      calc: "محاسبه آمار",
      clear: "پاک کردن",
      add: "+ افزودن",
      results: {
          mean: "میانگین (Mean)",
          median: "میانه (Median)",
          mode: "مد (Mode)",
          stdDev: "انحراف معیار (σ)",
          variance: "واریانس",
          sum: "مجموع",
          count: "تعداد (n)",
          min: "کمترین",
          max: "بیشترین"
      }
  },
  programmer: {
      hex: "HEX",
      dec: "DEC",
      oct: "OCT",
      bin: "BIN",
      ops: {
          and: "AND",
          or: "OR",
          xor: "XOR",
          not: "NOT",
          nand: "NAND",
          nor: "NOR",
          shl: "LSH",
          shr: "RSH"
      }
  },
  engineering: {
      tabs: {
          circuits: "مدارها",
          mechanics: "مکانیک",
          thermo: "ترمودینامیک"
      },
      circuits: {
          series: "مقاومت سری",
          parallel: "مقاومت موازی",
          calc: "محاسبه",
          r1: "مقاومت ۱ (Ω)",
          r2: "مقاومت ۲ (Ω)",
          result: "مقاومت کل"
      },
      mechanics: {
          force: "نیرو (F=ma)",
          mass: "جرم (kg)",
          accel: "شتاب (m/s²)",
          ke: "انرژی جنبشی",
          velocity: "سرعت (m/s)",
          energy: "انرژی (J)"
      },
      thermo: {
          heat: "انتقال حرارت",
          shc: "ظرفیت گرمایی (c)",
          deltaT: "اختلاف دما (ΔT)",
          q: "گرما (Q)"
      }
  },
  geometry: {
      tabs: {
          d2: "اشکال دو بعدی",
          d3: "اشکال سه بعدی"
      },
      shapes: {
          circle: "دایره",
          rectangle: "مستطیل",
          triangle: "مثلث",
          sphere: "کره",
          cylinder: "استوانه",
          cone: "مخروط"
      },
      inputs: {
          radius: "شعاع (r)",
          width: "عرض (w)",
          height: "ارتفاع (h)",
          base: "قاعده (b)",
          side: "ضلع (a)"
      },
      results: {
          area: "مساحت",
          perimeter: "محیط",
          volume: "حجم",
          surface: "مساحت سطح"
      }
  },
  learning: {
      title: "مرکز آموزش",
      topics: {
          algebra: "جبر و معادلات",
          geometry: "هندسه",
          physics: "فیزیک"
      },
      back: "بازگشت به لیست"
  },
  game: {
      title: "بازی محاسبات سریع",
      start: "شروع بازی",
      score: "امتیاز",
      highScore: "رکورد",
      time: "زمان",
      gameOver: "پایان بازی",
      playAgain: "بازی مجدد",
      correct: "درست!",
      wrong: "غلط!"
  },
  ai: {
      title: "دستیار هوش مصنوعی",
      placeholder: "سوال ریاضی خود را بپرسید...",
      send: "ارسال",
      thinking: "در حال فکر کردن...",
      error: "مشکلی پیش آمد. کلید API را بررسی کنید.",
      setKey: "تنظیم کلید API",
      noKeyMessage: "برای استفاده از هوش مصنوعی، باید کلید Google Gemini API خود را در تنظیمات وارد کنید.",
      goToSettings: "باز کردن تنظیمات"
  },
  camera: {
      title: "دوربین ریاضی",
      start: "شروع دوربین",
      capture: "گرفتن عکس",
      retake: "تلاش مجدد",
      process: "پردازش (بزودی)",
      permissionDenied: "دسترسی به دوربین رد شد.",
      instruction: "از مسئله ریاضی عکس بگیرید"
  }
};

export const dictionary: Record<Language, ITranslations> = {
  [Language.EN]: en,
  [Language.FA]: fa
};