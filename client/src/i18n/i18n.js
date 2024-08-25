import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from './translationEN.json'
import translationFR from './translationFR.json'
import translationES from './translationES.json'
import translationIT from './translationIT.json'
import translationDE from './translationDE.json'

const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  es: {
    translation: translationES
  },
  it: {
    translation: translationIT
  },
  de: {
    translation: translationDE
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;