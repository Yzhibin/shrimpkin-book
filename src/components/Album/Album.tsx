import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getContent } from '../../axios'
import HomeButton from '../HomeButton/HomeButton'
import './Album.css'

interface AlbumProps {
  p?: string
}

function Album({ p }: AlbumProps) {
  const params = useParams()

  const [files, setFiles] = useState<RepoContent[]>([])
  const [show, setShow] = useState<string>()

  const fetchData = useCallback(async () => {
    const path = p ?? params?.p
    if (!path) return
    try {
      const c = await getContent(path)
      const d = c?.filter(
        ({ type, name }) => type === 'file' && !name.startsWith('CONF'),
      )
      setFiles(d ?? [])
    } catch (e) {
      console.error(`Failed to fetch data from ${path}`)
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
        <div className="photos-area">
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
    </div>
  )
}

export default Album
