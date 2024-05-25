import { Link } from 'react-router-dom'
import './Copyright.css'

function Copyright() {
  return (
    <div className="copyright">
      <Link
        to="https://github.com/Yzhibin/shrimpkin-book"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit' }}
      >
        &copy; shrimpkin
      </Link>
    </div>
  )
}

export default Copyright
