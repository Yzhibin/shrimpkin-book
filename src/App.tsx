import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Album from './components/Album/Album'
import Copyright from './components/Copyright/Copyright'
import Landing from './components/Landing/Landing'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import i18n from './i18n'
import { useAppDispatch } from './store'
import {
  fetchAlbums,
  fetchConfig,
  selectAllAlbums,
} from './store/book/bookSlice'

function App() {
  // load i18n
  i18n

  const dispatch = useAppDispatch()
  const albums = useSelector(selectAllAlbums)

  useEffect(() => {
    if (albums.length === 0) {
      dispatch(fetchAlbums())
      return
    }

    for (const album of albums) {
      if (!album.conf) {
        dispatch(fetchConfig(album.id))
        // one at a time
        break
      }
    }
  }, [albums, dispatch])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Copyright />
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/a/:id" element={<Album />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
