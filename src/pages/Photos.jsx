import { useState } from 'react'

const photos = [
  { id: 1, title: 'Sunset Beach', url: 'https://via.placeholder.com/800x600?text=Photo+1' },
  { id: 2, title: 'Mountain View', url: 'https://via.placeholder.com/800x600?text=Photo+2' },
  { id: 3, title: 'City Lights', url: 'https://via.placeholder.com/800x600?text=Photo+3' },
  { id: 4, title: 'Forest Path', url: 'https://via.placeholder.com/800x600?text=Photo+4' },
  { id: 5, title: 'Ocean Waves', url: 'https://via.placeholder.com/800x600?text=Photo+5' },
  { id: 6, title: 'Desert Dunes', url: 'https://via.placeholder.com/800x600?text=Photo+6' },
  { id: 7, title: 'Winter Snow', url: 'https://via.placeholder.com/800x600?text=Photo+7' },
  { id: 8, title: 'Spring Flowers', url: 'https://via.placeholder.com/800x600?text=Photo+8' },
  { id: 9, title: 'Autumn Leaves', url: 'https://via.placeholder.com/800x600?text=Photo+9' },
]

function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  return (
    <div className="pt-24 px-6 pb-12">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
          Photo Gallery
        </h1>
        <p className="text-gray-400 text-center mb-12">Click on any photo to view in full size</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group cursor-pointer"
            >
              <div className="aspect-square bg-gradient-to-br from-pink-500 to-red-500 rounded-xl overflow-hidden transform group-hover:scale-105 transition-all border border-white/10">
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  📷
                </div>
              </div>
              <p className="text-sm mt-2 text-gray-300 text-center">{photo.title}</p>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button className="absolute top-4 right-4 text-4xl hover:text-purple-400 transition-colors">
              ×
            </button>
            <div className="max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
                <div className="aspect-video bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center">
                  <span className="text-6xl">📷</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold mt-4 text-center">{selectedPhoto.title}</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Photos
