import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Album from './components/Album/Album'
import Copyright from './components/Copyright/Copyright'
import Landing from './components/Landing/Landing'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'

function App() {
  return (
    <BrowserRouter>
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
