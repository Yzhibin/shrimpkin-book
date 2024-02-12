import { useEffect, useState } from 'react'
import i18n from '../../i18n'
import { Lang } from './Lang.types'

import './LanguageSelector.css'

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)

  const chooseLanguage = (lang: Lang) => {
    i18n.changeLanguage(lang)
    setSelectedLanguage(lang)
  }

  useEffect(() => {
    switch (selectedLanguage) {
      case Lang.zh:
        document.getElementById('root')?.classList.replace('lang-en', 'lang-zh')
        break
      case Lang.en:
      default:
        document.getElementById('root')?.classList.replace('lang-zh', 'lang-en')
    }
  }, [selectedLanguage])

  return (
    <div className="language-selector">
      <div
        className={`language-selector-element-en ${selectedLanguage === Lang.en ? 'inverted' : ''}`}
        onClick={() => chooseLanguage(Lang.en)}
      >
        Eng
      </div>
      <div
        className={`language-selector-element-zh ${selectedLanguage === Lang.zh ? 'inverted' : ''}`}
        onClick={() => chooseLanguage(Lang.zh)}
      >
        中文
      </div>
    </div>
  )
}

export default LanguageSelector
