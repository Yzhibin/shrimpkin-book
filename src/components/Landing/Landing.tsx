import { useTranslation } from 'react-i18next'
import LanguageSelector from '../LanguageSelector/LanguageSelector'
import './Landing.css'

function Landing() {
  const { t } = useTranslation()

  return (
    <div className="landing">
      <LanguageSelector />
      <div className="greeting-container">
        <div className="greeting-line">{t('greeting')}&nbsp;</div>
        <div className="greeting-line inverted">
          <div className="typewriter">&nbsp;{t('myName')}&nbsp;</div>
        </div>
      </div>
    </div>
  )
}

export default Landing
