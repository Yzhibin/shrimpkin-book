import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Lang } from './Lang.types'
import './LanguageSelector.css'

const LanguageSelector = () => {
  const { i18n } = useTranslation()

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  const chooseLanguage = useCallback(
    (lang: Lang) => {
      i18n.changeLanguage(lang)
      setSelectedLanguage(lang)
    },
    [i18n],
  )

  const [searchParams] = useSearchParams()
  useEffect(() => {
    const l = searchParams.get('lang')
    switch (l) {
      case Lang.en:
      case Lang.zh:
        chooseLanguage(l)
        break
      default:
    }
  }, [searchParams, chooseLanguage])

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
