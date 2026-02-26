import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        {/* 右上角微信二维码 */}
        <div className="absolute top-4 right-4 flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
          <img 
            src="/images/wechat-qr.png" 
            alt="WeChat QR Code" 
            className="w-32 h-32 rounded-lg border-2 border-green-600"
          />
          <span className="text-2xl font-mono bg-green-700 px-4 py-2 rounded-lg">11332288999</span>
          <p className="text-sm text-gray-400">Scan or add my WeChat ID directly</p>
        </div>
        
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Vlogs · Photos · Games
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/vlogs" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
              Watch Vlogs
            </Link>
            <Link to="/photos" className="px-8 py-4 bg-pink-600 hover:bg-pink-700 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
              View Photos
            </Link>
            <Link to="/games" className="px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
              Play Games
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Content</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/vlogs" className="block group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-6xl">🎬</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Latest Vlogs</h3>
                  <p className="text-gray-400">Watch my latest video content</p>
                </div>
              </div>
            </Link>
            <Link to="/photos" className="block group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                <div className="aspect-video bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                  <span className="text-6xl">📸</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Photo Gallery</h3>
                  <p className="text-gray-400">Explore my photography collection</p>
                </div>
              </div>
            </Link>
            <Link to="/games" className="block group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                <div className="aspect-video bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <span className="text-6xl">🎮</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Game Zone</h3>
                  <p className="text-gray-400">Play games I've created</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
