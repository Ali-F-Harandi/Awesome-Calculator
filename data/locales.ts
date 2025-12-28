import { ITranslations, Language } from '../types';

// English Translations
const en: ITranslations = {
  title: "Awesome Calculator",
  placeholder: "Type or click...",
  error: "Invalid Format",
  clear: "AC",
  delete: "⌫",
  calculate: "=",
  footerName: "Ali F. Harandi",
  footerRole: "Awesome Calculator Project v1.5.1",
  history: "History",
  settings: "Settings",
  themeColor: "Theme Color",
  designStyle: "Design Style",
  historyMode: "History View",
  sound: "Sound Effects",
  vibration: "Haptic Feedback",
  copied: "Copied!",
  modes: {
    overlay: "Overlay (Modal)",
    sidebar: "Split View (Side)"
  },
  darkMode: "Dark Mode",
  language: "Language",
  close: "Close",
  selectColor: "Select Accent Color",
  styles: {
    modern: "Modern",
    retro: "Retro",
    cyberpunk: "Cyberpunk",
    minimal: "Minimal"
  },
  clearHistory: "Clear History",
  noHistory: "No history yet",
  historyTooltip: "View History"
};

// Persian Translations
const fa: ITranslations = {
  title: "ماشین حساب پیشرفته",
  placeholder: "تایپ کنید...",
  error: "خطا در فرمت",
  clear: "C",
  delete: "⌫",
  calculate: "=",
  footerName: "علی فـ. هرندی",
  footerRole: "پروژه ماشین حساب نسخه ۱.۵.۱",
  history: "تاریخچه",
  settings: "تنظیمات",
  themeColor: "رنگ تم",
  designStyle: "سبک طراحی",
  historyMode: "نحوه نمایش تاریخچه",
  sound: "افکت صوتی",
  vibration: "بازخورد لرزشی",
  copied: "کپی شد!",
  modes: {
    overlay: "روی صفحه (مودال)",
    sidebar: "کنار صفحه (جداگانه)"
  },
  darkMode: "حالت تاریک",
  language: "زبان برنامه",
  close: "بستن",
  selectColor: "انتخاب رنگ اصلی",
  styles: {
    modern: "مدرن",
    retro: "رترو (قدیمی)",
    cyberpunk: "سایبرپانک",
    minimal: "مینیمال"
  },
  clearHistory: "پاک کردن تاریخچه",
  noHistory: "تاریخچه‌ای موجود نیست",
  historyTooltip: "مشاهده تاریخچه"
};

export const dictionary: Record<Language, ITranslations> = {
  [Language.EN]: en,
  [Language.FA]: fa
};