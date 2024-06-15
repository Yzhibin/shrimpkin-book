import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { getConfig, getContent } from '../../axios'
import './List.css'

interface ListProps {
  p: string
}

function List({ p }: ListProps) {
  const { i18n } = useTranslation()
  const navigate = useNavigate()

  const [dirs, setDirs] = useState<RepoContent[]>([])

  const fetchData = useCallback(async () => {
    if (!p) return
    try {
      const c = await getContent(p)
      const d = c?.filter(({ type }) => type === 'dir') ?? []
      // latest first
      d.reverse()
      setDirs([...d])

      for (const dir of d) {
        const conf = await getConfig(dir.path)
        dir.conf = conf
      }
      setDirs([...d])
    } catch (e) {
      console.error(`Failed to fetch data from ${p}`)
    }
  }, [p])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="list-container">
      {dirs.map((dir) => {
        let theOne, theOther
        if (dir.conf) {
          if (i18n.language === 'en') {
            theOne = dir.conf.en
            theOther = dir.conf.zh
          } else if (i18n.language === 'zh') {
            theOne = dir.conf.zh
            theOther = dir.conf.en
          }
        }

        return (
          <div
            className="list-item"
            key={dir.name}
            onClick={() => navigate(`/a/${dir.name}`)}
          >
            {theOne ?? theOther ?? dir.name}
          </div>
        )
      })}
    </div>
  )
}

export default List
