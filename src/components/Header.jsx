import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-md z-50 border-b border-white/10">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            关老师与小雨老师的Live with Culture 
          </Link>
          <div className="flex space-x-8">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/vlogs" className="hover:text-purple-400 transition-colors">Vlogs</Link>
            <Link to="/photos" className="hover:text-purple-400 transition-colors">Photos</Link>
            <Link to="/games" className="hover:text-purple-400 transition-colors">Games</Link>
            <Link to="/about" className="hover:text-purple-400 transition-colors">About</Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
