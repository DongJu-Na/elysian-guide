"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import "../style/language-selector.css"
import i18n from "../i18n" // i18n 설정 파일 import

// 다국어 옵션 설정
const languages = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh-CN", name: "中文(简体)", flag: "🇨🇳" }, // 중국어 간체
  { code: "zh-TW", name: "中文(繁體)", flag: "🇹🇼" }, // 중국어 번체
]

function LanguageSelector() {
  const [language, setLanguage] = useState(languages.find(lang => lang.code === i18n.language) || languages[0])
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)

  // 언어 변경 처리
  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    i18n.changeLanguage(lang.code) // i18n 라이브러리에 언어 변경 요청
    setIsLanguageMenuOpen(false)
  }

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  // 클릭 외부 감지 -> 언어 선택 창 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="language-selector" ref={languageMenuRef}>
      <button className="language-button" onClick={toggleLanguageMenu}>
        <Globe size={18} />
        <span>{language.flag}</span>
      </button>
      {isLanguageMenuOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`language-option ${language.code === lang.code ? "active" : ""}`}
              onClick={() => handleLanguageChange(lang)}
            >
              <span className="flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
