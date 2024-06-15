import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Album from './components/Album/Album'
import Copyright from './components/Copyright/Copyright'
import Landing from './components/Landing/Landing'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import i18n from './i18n'

function App() {
  // load i18n
  i18n

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Copyright />
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/a/:p" element={<Album />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
