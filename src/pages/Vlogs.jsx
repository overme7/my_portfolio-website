import { useState } from 'react'

const vlogs = [
  { id: 1, title: 'My First Vlog', thumbnail: 'https://via.placeholder.com/600x340?text=Vlog+1', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 2, title: 'Daily Life', thumbnail: 'https://via.placeholder.com/600x340?text=Vlog+2', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 3, title: 'Travel Adventure', thumbnail: 'https://via.placeholder.com/600x340?text=Vlog+3', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 4, title: 'Tutorial Video', thumbnail: 'https://via.placeholder.com/600x340?text=Vlog+4', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 5, title: 'Behind the Scenes', thumbnail: 'https://via.placeholder.com/600x340?text=Vlog+5', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { id: 6, title: 'Special Episode', thumbnail: 'https://via.placeholder.com/600x340?text=Vlog+6', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
]

function Vlogs() {
  const [selectedVlog, setSelectedVlog] = useState(null)

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
              onClick={() => setSelectedVlog(null)}
              className="mb-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              ← Back to All Vlogs
            </button>
            <div className="aspect-video max-w-4xl mx-auto">
              <iframe
                src={selectedVlog.url}
                className="w-full h-full rounded-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="text-3xl font-bold mt-6 text-center">{selectedVlog.title}</h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vlogs.map((vlog) => (
              <div
                key={vlog.id}
                onClick={() => setSelectedVlog(vlog)}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
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
        )}
      </div>
    </div>
  )
}

export default Vlogs
