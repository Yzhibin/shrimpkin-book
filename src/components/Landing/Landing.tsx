import { useTranslation } from 'react-i18next'
import List from '../List/List'
import './Landing.css'

function Landing() {
  const { t } = useTranslation()

  return (
    <div className="landing">
      <div className="greeting-container">
        <div className="greeting-line">{t('greeting')}&nbsp;</div>
        <div className="greeting-line inverted">
          <div className="typewriter">&nbsp;{t('myName')}&nbsp;</div>
        </div>
      </div>
      <List p="/" />
    </div>
  )
}

export default Landing
