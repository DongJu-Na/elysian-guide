import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import enTranslation from "./locales/en.json"
import koTranslation from "./locales/ko.json"
import jaTranslation from "./locales/ja.json"
import zhCNTranslation from "./locales/zh-CN.json"  // 간체
import zhTWTranslation from "./locales/zh-TW.json"  // 번체

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ko: { translation: koTranslation },
      ja: { translation: jaTranslation },
      "zh-CN": { translation: zhCNTranslation }, // 간체
      "zh-TW": { translation: zhTWTranslation }, // 번체
    },
    lng: "ko", // 기본 언어
    fallbackLng: "en", // 지원하지 않는 언어일 경우 영어 사용
    interpolation: {
      escapeValue: false, // React에서 XSS 방지 기능을 자동 처리하므로 false로 설정
    },
  })

export default i18n
