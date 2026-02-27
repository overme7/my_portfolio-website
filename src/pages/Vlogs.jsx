import { useState } from 'react'

const vlogs = [
  {
    id: 1,
    title: 'My First Vlog (YouTube)',
    thumbnail: 'https://via.placeholder.com/600x340?text=YouTube',
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    platform: 'youtube',
    cover: '/assets/youtube-folder-cover.jpg'
  },
  {
    id: 2,
    title: 'Bilibili Video',
    thumbnail: 'https://via.placeholder.com/600x340?text=Bilibili',
    url: 'https://www.bilibili.com/video/av54800931/',
    platform: 'bilibili',
    cover: '/assets/bilibili-folder-cover.jpg'
  },
  {
    id: 3,
    title: 'Local Videos',
    thumbnail: 'https://via.placeholder.com/600x340?text=Local+Videos',
    platform: 'local-folder',
    cover: '/assets/local-videos-folder-cover.jpg'
  }
]

const localVideos = [
  {
    id: 'local-1',
    title: 'Video 1',
    url: '/videos/video1.mov'
  },
  {
    id: 'local-2',
    title: 'Video 2',
    url: '/videos/video1%20copy.mov'
  }
]

function Vlogs() {
  const [selectedVlog, setSelectedVlog] = useState(null)
  const [showLocalVideos, setShowLocalVideos] = useState(false)

  const renderVideoPlayer = (vlog) => {
    if (vlog.platform === 'local' || localVideos.some(lv => lv.id === vlog.id)) {
      const fileType = vlog.url.endsWith('.mov') ? 'video/quicktime' : 'video/mp4'
      return (
        <video
          controls
          className="w-full h-full rounded-2xl"
        >
          <source src={vlog.url} type={fileType} />
          Your browser does not support the video tag.
        </video>
      )
    }

    const iframeProps = vlog.platform === 'bilibili'
      ? { scrolling: 'no', border: '0' }
      : { allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' }

    return (
      <iframe
        {...iframeProps}
        src={vlog.url}
        className="w-full h-full rounded-2xl"
        allowFullScreen
      />
    )
  }

  return (
    <div className="pt-24 px-6 pb-12">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          My Vlogs
        </h1>
        <p className="text-gray-400 text-center mb-12">Watch my latest video content</p>

        {selectedVlog ? (
          <div className="mb-8">
            <button
              onClick={() => {
                setSelectedVlog(null)
                if (localVideos.some(lv => lv.id === selectedVlog.id)) {
                  setShowLocalVideos(true)
                }
              }}
              className="mb-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              ← {localVideos.some(lv => lv.id === selectedVlog.id) ? 'Back to Local Videos' : 'Back to All Vlogs'}
            </button>
            <div className="aspect-video max-w-4xl mx-auto">
              {renderVideoPlayer(selectedVlog)}
            </div>
            <h2 className="text-3xl font-bold mt-6 text-center">{selectedVlog.title}</h2>
          </div>
        ) : showLocalVideos ? (
          <div>
            <button
              onClick={() => setShowLocalVideos(false)}
              className="mb-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              ← Back to All Vlogs
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center">Local Videos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localVideos.map((vlog) => (
                <div
                  key={vlog.id}
                  onClick={() => setSelectedVlog(vlog)}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                    <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center">
                      <span className="text-4xl">▶️</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{vlog.title}</h3>
                      <p className="text-gray-400 mt-2">Click to watch</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vlogs.map((vlog) => (
              <div
                key={vlog.id}
                onClick={() => {
                  if (vlog.platform === 'local-folder') {
                    setShowLocalVideos(true)
                  } else {
                    setSelectedVlog(vlog)
                  }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                  <img src={vlog.cover} alt={vlog.title} className="w-full h-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{vlog.title}</h3>
                    <p className="text-gray-400 mt-2">Click to watch</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Vlogs
