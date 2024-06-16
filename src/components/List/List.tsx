import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectAllAlbums } from '../../store/book/bookSlice'
import './List.css'

function List() {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  const albums = useSelector(selectAllAlbums)

  return (
    <div className="list-container">
      {albums.map((album) => {
        let theOne, theOther
        if (album.conf) {
          if (i18n.language === 'en') {
            theOne = album.conf.en
            theOther = album.conf.zh
          } else if (i18n.language === 'zh') {
            theOne = album.conf.zh
            theOther = album.conf.en
          }
        }

        return (
          <div
            className="list-item"
            key={album.id}
            onClick={() => navigate(`/a/${album.id}`)}
          >
            {theOne ?? theOther ?? album.id}
          </div>
        )
      })}
    </div>
  )
}

export default List
