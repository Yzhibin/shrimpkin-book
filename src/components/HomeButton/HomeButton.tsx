import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './HomeButton.css'

function HomeButton() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="home-button" onClick={() => navigate('/')}>
      {t('home')}
    </div>
  )
}

export default HomeButton
