export enum Language {
  EN = 'en',
  FA = 'fa'
}

// Supported color themes
export type ThemeColor = 'purple' | 'blue' | 'green' | 'orange' | 'pink';

// Supported Design Styles
export type DesignStyle = 'modern' | 'retro' | 'cyberpunk' | 'minimal';

// New: History Display Mode
export type HistoryMode = 'overlay' | 'sidebar';

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
  themeColor: string;
  designStyle: string;
  historyMode: string;
  sound: string; 
  vibration: string; 
  copied: string; 
  modes: {
    overlay: string;
    sidebar: string;
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
  };
  clearHistory: string;
  noHistory: string;
  historyTooltip: string;
  memoryTooltip: string;
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