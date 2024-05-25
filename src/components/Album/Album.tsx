import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getContent } from '../../axios'
import HomeButton from '../HomeButton/HomeButton'
import './Album.css'

interface AlbumProps {
  p?: string
}

function Album({ p }: AlbumProps) {
  const [files, setFiles] = useState<RepoContent[]>([])
  const params = useParams()

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

  return (
    <div className="album">
      <HomeButton />
      <div className="album-backdrop">
        <div className="photos-area">
          {files.map((f) => (
            <img className="photo" key={f.name} src={f.download_url} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Album
