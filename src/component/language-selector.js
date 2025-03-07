"use client"

import { useState, useRef, useEffect } from "react"
import { Globe } from "lucide-react"
import "../style/language-selector.css"

// Language options with flag icons
const languages = [
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
]

function LanguageSelector() {
  const [language, setLanguage] = useState(languages[0])
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setIsLanguageMenuOpen(false)
  }

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen)
  }

  // Close language menu when clicking outside
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

