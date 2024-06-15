import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { getConfig, getContent } from '../../axios'
import HomeButton from '../HomeButton/HomeButton'
import { Lang } from '../LanguageSelector/Lang.types'
import './Album.css'

interface AlbumProps {
  p?: string
}

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

function Album({ p }: AlbumProps) {
  const params = useParams()
  const { i18n } = useTranslation()

  const [files, setFiles] = useState<RepoContent[]>([])
  const [show, setShow] = useState<string>()
  const [conf, setConf] = useState<Conf>({})

  const fetchData = useCallback(async () => {
    const path = p ?? params?.p
    if (!path) return

    try {
      setConf(await getConfig(path))
      const c = await getContent(path)
      const d = c?.filter(
        ({ type, name }) => type === 'file' && !name.startsWith('CONF'),
      )
      setFiles(d ?? [])
    } catch (e) {
      console.error(`Failed to fetch files from ${path}`)
    }
  }, [p, params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

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
        <h1 className="album-title">
          {(i18n.language === Lang.en ? conf.en : conf.zh) ?? '...'}
        </h1>

        {files.length === 0 && <Blank n={9} />}
        {files.map((f) => (
          <img
            className="photo"
            key={f.name}
            src={f.download_url}
            onClick={() => modalOn(f.download_url)}
          />
        ))}
      </div>
    </div>
  )
}

export default Album
