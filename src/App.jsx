import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Vlogs from './pages/Vlogs'
import Photos from './pages/Photos'
import Games from './pages/Games'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vlogs" element={<Vlogs />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/games" element={<Games />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
