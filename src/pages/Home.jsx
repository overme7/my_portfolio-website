import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function Home() {
  const videoRefs = [useRef(), useRef(), useRef()]
  const [scrollY, setScrollY] = useState(0)
  const [latestImage, setLatestImage] = useState('/images/Screen Shot 2026-02-26 at 14.39.14.png')
  const [latestGameImage, setLatestGameImage] = useState('')
  const birdSoundRef = useRef(new Audio('/sounds/bird.mp3'))
  const wasVisibleRef = useRef(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Load latest image from public/images folder
  useEffect(() => {
    const loadLatestImage = async () => {
      try {
        const imageModules = import.meta.glob('/public/images/*.{png,jpg,jpeg,gif,webp,svg}', {
          eager: true,
          query: { url: true }
        })

        const images = Object.entries(imageModules).map(([path, module]) => ({
          path: path,
          url: path.replace('/public', '')
        }))

        // Sort by filename to get latest (assuming timestamp in filename)
        images.sort((a, b) => b.path.split('/').pop().localeCompare(a.path.split('/').pop()))

        if (images.length > 0) {
          setLatestImage(images[0].url)
        }
      } catch (error) {
        console.error('Error loading images:', error)
      }
    }

    loadLatestImage()
  }, [])

  // Load latest image from public/games folder
  useEffect(() => {
    const loadLatestGameImage = async () => {
      try {
        // Try API endpoint first (dev mode - uses modification time)
        let response = await fetch('/api/games-images')

        // If API works (dev mode)
        if (response.ok) {
          const gameImages = await response.json()
          console.log('Loaded game images from API:', gameImages)
          if (gameImages.length > 0) {
            setLatestGameImage(gameImages[0])
            return
          }
        }

        // Try JSON manifest (production mode - uses modification time)
        response = await fetch('/api/games-images.json')
        if (response.ok) {
          const gameImages = await response.json()
          console.log('Loaded game images from JSON:', gameImages)
          if (gameImages.length > 0) {
            setLatestGameImage(gameImages[0])
            return
          }
        }

        // Fallback to import.meta.glob (uses filename)
        const gameImageModules = import.meta.glob('/public/games/*.{png,jpg,jpeg,gif,webp,svg}', {
          eager: true,
          query: { url: true }
        })

        const gameImages = Object.entries(gameImageModules).map(([path, module]) => ({
          path: path,
          url: path.replace('/public', '')
        }))

        // Sort by filename to get latest
        gameImages.sort((a, b) => b.path.split('/').pop().localeCompare(a.path.split('/').pop()))

        console.log('All game images:', gameImages)
        if (gameImages.length > 0) {
          setLatestGameImage(gameImages[0].url)
        }
      } catch (error) {
        console.error('Error loading game images:', error)
        // Fallback - use games directory which is copied to dist
        setLatestGameImage('/games/dsaOIP-C.r0iad7nKIF7Ota_U-GP0hwHaEK.png')
      }
    }

    loadLatestGameImage()
  }, [])

  // Calculate opacity: fade out when QR image's 1/4 top moves above header bottom
  // Header height = ~80px (py-4 = 1rem = 16px top + 16px bottom + content)
  // QR image position: top-20 (80px from top)
  // QR image height: w-24 h-24 (96px)
  // 1/4 of QR image = 24px
  // QR image top position = 80px
  // When scrollY > (80px - 24px - 80px header height) = -24px → actually needs different calculation
  // Header bottom = 80px from top
  // QR image 1/4 top position from viewport = 80px (fixed position)
  // When scrolling up, QR image moves with scroll. The header stays fixed.
  // QR image disappears when its 1/4 top goes above header bottom
  // QR image initial 1/4 position: 80px + 0px = 80px
  // Header bottom: 80px
  // When scrollY = 24px, QR image 1/4 top = 80px + 24px = 104px (above header bottom)
  // So fade out from scrollY 0 to 24
  const qrOpacity = Math.max(0, 1 - scrollY / 24)

  // Play bird sound when QR image appears/disappears
  useEffect(() => {
    const isVisible = qrOpacity > 0.5

    if (isVisible !== wasVisibleRef.current) {
      wasVisibleRef.current = isVisible

      if (birdSoundRef.current) {
        // Stop current sound and reset to start
        birdSoundRef.current.pause()
        birdSoundRef.current.currentTime = 0
        // Play new sound
        birdSoundRef.current.play().catch(console.error)
      }
    }
  }, [qrOpacity])

  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      if (ref.current) {
        let playCount = 0
        const video = ref.current
        const handlePlay = () => {
          playCount = 0
        }
        const handleEnded = () => {
          playCount++
          if (playCount < 3) {
            video.currentTime = 0
            video.play()
          }
        }
        video.addEventListener('play', handlePlay)
        video.addEventListener('ended', handleEnded)
        return () => {
          video.removeEventListener('play', handlePlay)
          video.removeEventListener('ended', handleEnded)
        }
      }
    })
  }, [])
  return (
    <div className="pt-20 relative">
      {/* WeChat QR Code - Top Right Corner */}
      <div className="absolute top-20 right-4 z-50 flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20" style={{ opacity: qrOpacity, transition: 'opacity 0.3s ease' }}>
        <img
          src="/assets/wechat-qr.png"
          alt="WeChat QR Code"
          className="w-24 h-24 rounded-lg border-2 border-green-600"
        />
        <span className="text-lg font-mono bg-green-700 px-3 py-1 rounded-lg">11332288999</span>
      </div>

      {/* Short Movies Section */}
      <section className="pt-17 pb-4 py-40 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">Short Movies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video">
                <video ref={videoRefs[0]} className="w-full h-full object-cover" controls autoPlay muted loop>
                  <source src="/videos/movie1.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Movie Title 1</h3>
                <p className="text-sm text-gray-400">Description of the short movie</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video">
                <video ref={videoRefs[1]} className="w-full h-full object-cover" controls autoPlay muted loop>
                  <source src="/videos/movie2.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Movie Title 2</h3>
                <p className="text-sm text-gray-400">Description of the short movie</p>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
              <div className="aspect-video">
                <video ref={videoRefs[2]} className="w-full h-full object-cover" controls autoPlay muted loop>
                  <source src="/videos/movie3.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Movie Title 3</h3>
                <p className="text-sm text-gray-400">Description of the short movie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className=" flex items-start justify-center px-6 py-10 relative"> 
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-black italic mb-6 bg-gradient-to-r from-pink-200 via-pink-500 to-red-800 bg-clip-text text-transparent" style={{ fontFamily: 'Georgia, serif' }}>
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
      <section className="py-2 px-22 -mt-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Content</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/vlogs" className="block group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                <div className="aspect-video">
                  <video src="/videos/video1%20copy.mov" className="w-full h-full object-cover" muted />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Latest Vlogs</h3>
                  <p className="text-gray-400">Watch my latest video content</p>
                </div>
              </div>
            </Link>
            <Link to="/photos" className="block group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                <div className="aspect-video">
                  <img src={latestImage} alt="Photo Gallery" className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Photo Gallery</h3>
                  <p className="text-gray-400">Explore my photography collection</p>
                </div>
              </div>
            </Link>
            <Link to="/games" className="block group">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                <div className="aspect-video">
                  <img src={latestGameImage} alt="Game Zone" className="w-full h-full object-cover" />
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
