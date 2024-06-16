import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { fetchImages, selectAlbum } from '../../store/book/bookSlice'
import HomeButton from '../HomeButton/HomeButton'
import './Album.css'

interface BlankProps {
  n: number
}
function Blank({ n }: BlankProps) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <span key={`blank-${i}`} className="photo" />
      ))}
    </>
  )
}

function Album() {
  const params = useParams()
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()

  const album = useAppSelector((state) => selectAlbum(state, params?.id))

  const [show, setShow] = useState<string>()

  useEffect(() => {
    if (album && !album.images) {
      dispatch(fetchImages(album.id))
    }
  }, [album, dispatch])

  const modalOn = (url: string) => {
    setShow(url)
    document.body.classList.add('no-scroll')
  }

  const modalOff = () => {
    setShow(undefined)
    document.body.classList.remove('no-scroll')
  }

  return (
    <div className="album">
      <HomeButton />
      {show && (
        <div className="modal" onClick={modalOff}>
          <img src={show} />
        </div>
      )}
      <div className="album-backdrop">
        {album &&
          (() => {
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
              <h1 className="album-title">{theOne ?? theOther ?? album.id}</h1>
            )
          })()}

        {!album?.images && <Blank n={9} />}
        {album?.images?.map((url, index) => (
          <img
            className="photo"
            key={`image-${index}`}
            src={url}
            onClick={() => modalOn(url)}
          />
        ))}
      </div>
    </div>
  )
}

export default Album
