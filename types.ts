

export enum Language {
  EN = 'en',
  FA = 'fa'
}

// Supported color themes
export type ThemeColor = 'purple' | 'blue' | 'green' | 'orange' | 'pink';

// Supported Design Styles
export type DesignStyle = 'modern' | 'retro' | 'cyberpunk' | 'minimal' | 'neobrutalism' | 'glass';

// History Display Mode
export type HistoryMode = 'overlay' | 'sidebar';

// New: App Modes including Phase 13 additions and Phase 14 Camera
export type AppMode = 'standard' | 'scientific' | 'converter' | 'graphing' | 'solver' | 'finance' | 'currency' | 'time' | 'matrix' | 'statistics' | 'programmer' | 'engineering' | 'geometry' | 'learning' | 'game' | 'ai' | 'camera';

// New: Angle Mode for Scientific Calc (v2.1.0)
export type AngleMode = 'DEG' | 'RAD';

export interface ITranslations {
  title: string;
  placeholder: string;
  error: string;
  errors: {
    divZero: string;
    invalidFormat: string;
    openParen: string;
  };
  clear: string;
  delete: string;
  calculate: string;
  footerName: string;
  footerRole: string;
  history: string;
  settings: string;
  dataManagement: string;
  exportData: string;
  importData: string;
  dataCopied: string;
  dataImported: string;
  themeColor: string;
  designStyle: string;
  historyMode: string;
  sound: string; 
  vibration: string; 
  copied: string; 
  apiKey: string;
  apiKeyPlaceholder: string;
  apiKeyHelp: string;
  modes: {
    overlay: string;
    sidebar: string;
  };
  appModes: {
    standard: string;
    scientific: string;
    converter: string;
    graphing: string;
    solver: string;
    finance: string;
    currency: string;
    time: string;
    matrix: string;
    statistics: string;
    programmer: string;
    engineering: string;
    geometry: string;
    learning: string;
    game: string;
    ai: string;
    camera: string;
  };
  darkMode: string;
  language: string;
  close: string;
  selectColor: string;
  styles: {
    modern: string;
    retro: string;
    cyberpunk: string;
    minimal: string;
    neobrutalism: string;
    glass: string;
  };
  clearHistory: string;
  noHistory: string;
  historyTooltip: string;
  memoryTooltip: string;
  installApp: string;
  install: string;
  installed: string;
  comingSoon: string;
  voice: {
      listening: string;
      error: string;
      notSupported: string;
  };
  graphing: {
      placeholder: string;
      help: string;
      addFunction: string;
      modes: {
          cartesian: string;
          polar: string;
      };
      export: string;
  };
  solver: {
      tabs: {
          linear: string;
          quadratic: string;
          cubic: string;
          system2: string;
          system3: string;
          pythagoras: string;
          ohms: string;
      };
      coeffs: string;
      solve: string;
      roots: string;
      discriminant: string;
      noRealRoots: string;
      infiniteSolutions: string;
      noSolution: string;
      pythagorasHelp: string; 
      sides: {
          a: string;
          b: string;
          c: string;
      };
      physics: {
          v: string;
          i: string;
          r: string;
      };
      results: {
          x: string;
          y: string;
          z: string;
          generic: string;
      }
  };
  finance: {
    tabs: {
      loan: string;
      discount: string;
      bmi: string;
    };
    loan: {
      principal: string;
      rate: string;
      years: string;
      monthlyPayment: string;
      totalInterest: string;
    };
    discount: {
      price: string;
      discount: string;
      finalPrice: string;
      saved: string;
    };
    bmi: {
      weight: string;
      height: string;
      result: string;
      status: string;
      statuses: {
        underweight: string;
        normal: string;
        overweight: string;
        obese: string;
      };
    };
  };
  converter: {
    from: string;
    to: string;
    length: string;
    mass: string;
    temperature: string;
    data: string;
    time: string;
    speed: string;
    base: string;
    addToHistory: string;
    units: {
        [key: string]: string;
    };
  };
  currency: {
      base: string;
      update: string;
      lastUpdate: string;
      loading: string;
      error: string;
  };
  time: {
      worldClock: string;
      diff: string;
      current: string;
      selectZone: string;
      timeDiff: string;
      ahead: string;
      behind: string;
  };
  matrix: {
    dims: string;
    set: string;
    ops: {
        add: string;
        sub: string;
        mul: string;
        det: string;
        inv: string;
        trans: string;
    };
    matrixA: string;
    matrixB: string;
    result: string;
    error: string;
  };
  statistics: {
      inputPlaceholder: string;
      calc: string;
      clear: string;
      add: string;
      results: {
          mean: string;
          median: string;
          mode: string;
          stdDev: string;
          variance: string;
          sum: string;
          count: string;
          min: string;
          max: string;
      }
  };
  programmer: {
      hex: string;
      dec: string;
      oct: string;
      bin: string;
      ops: {
          and: string;
          or: string;
          xor: string;
          not: string;
          nand: string;
          nor: string;
          shl: string;
          shr: string;
      };
  };
  engineering: {
      tabs: {
          circuits: string;
          mechanics: string;
          thermo: string;
      };
      circuits: {
          series: string;
          parallel: string;
          calc: string;
          r1: string;
          r2: string;
          result: string;
      };
      mechanics: {
          force: string;
          mass: string;
          accel: string;
          ke: string;
          velocity: string;
          energy: string;
      };
      thermo: {
          heat: string;
          shc: string; // Specific Heat Capacity
          deltaT: string;
          q: string;
      };
  };
  geometry: {
      tabs: {
          d2: string;
          d3: string;
      };
      shapes: {
          circle: string;
          rectangle: string;
          triangle: string;
          sphere: string;
          cylinder: string;
          cone: string;
      };
      inputs: {
          radius: string;
          width: string;
          height: string;
          base: string;
          side: string;
      };
      results: {
          area: string;
          perimeter: string;
          volume: string;
          surface: string;
      };
  };
  learning: {
      title: string;
      topics: {
          algebra: string;
          geometry: string;
          physics: string;
      };
      back: string;
  };
  game: {
      title: string;
      start: string;
      score: string;
      highScore: string;
      time: string;
      gameOver: string;
      playAgain: string;
      correct: string;
      wrong: string;
  };
  ai: {
      title: string;
      placeholder: string;
      send: string;
      thinking: string;
      error: string;
      setKey: string;
      noKeyMessage: string;
      goToSettings: string;
  };
  camera: {
      title: string;
      start: string;
      capture: string;
      retake: string;
      process: string;
      permissionDenied: string;
      instruction: string;
  };
}

export interface IKeypadButton {
  label: string;
  value: string;
  type: 'number' | 'operator' | 'action' | 'scientific' | 'memory';
  className?: string;
}

export interface IHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}
