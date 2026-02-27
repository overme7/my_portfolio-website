import { useState, useEffect } from 'react'

const onlinePhotos = [
  { id: 1, title: 'Sunset Beach', url: 'https://via.placeholder.com/800x600?text=Photo+1' },
  { id: 2, title: 'Mountain View', url: 'https://via.placeholder.com/800x600?text=Photo+2' },
  { id: 3, title: 'City Lights', url: 'https://via.placeholder.com/800x600?text=Photo+3' },
  { id: 4, title: 'Forest Path', url: 'https://via.placeholder.com/800x600?text=Photo+4' },
]

function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentFolder, setCurrentFolder] = useState(null)
  const [localPhotos, setLocalPhotos] = useState([])

  // Load images from public/images folder dynamically
  useEffect(() => {
    const loadLocalImages = async () => {
      try {
        // List of common image extensions to look for
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']

        // Import all images from the images folder
        const imageModules = import.meta.glob('/public/images/*.{png,jpg,jpeg,gif,webp,svg}', {
          eager: true,
          query: { url: true }
        })

        const images = Object.entries(imageModules).map(([path, module], index) => {
          // Extract filename from path
          const fileName = path.split('/').pop()
          return {
            id: `local-${index}`,
            title: fileName,
            url: path.replace('/public', '')
          }
        })

        // Sort by filename to get latest (assuming timestamp in filename)
        images.sort((a, b) => b.title.localeCompare(a.title))

        setLocalPhotos(images)
      } catch (error) {
        console.error('Error loading local images:', error)
      }
    }

    loadLocalImages()
  }, [])

  const getPhotosForFolder = () => {
    if (currentFolder === 'local') {
      return localPhotos
    } else if (currentFolder === 'online') {
      return onlinePhotos
    }
    return []
  }

  // Get latest local photo for Photo Gallery cover
  const latestLocalPhoto = localPhotos.length > 0 ? localPhotos[0] : null

  const photoFolders = [
    {
      id: 1,
      title: 'Local Photos',
      platform: 'local-folder',
      cover: latestLocalPhoto?.url || '/assets/local-folder-cover.jpg'
    },
    {
      id: 2,
      title: 'Online Photos',
      platform: 'online-folder',
      cover: '/assets/online-folder-cover.jpg'
    }
  ]

  return (
    <div className="pt-24 px-6 pb-12">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
          Photo Gallery
        </h1>
        <p className="text-gray-400 text-center mb-12">Click on any photo to view in full size</p>

        {selectedPhoto ? (
          <div className="mb-8">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="mb-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              ← Back to Photos
            </button>
            <div className="max-w-5xl max-h-[90vh] mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="w-full h-auto"
                />
              </div>
              <h2 className="text-3xl font-bold mt-6 text-center">{selectedPhoto.title}</h2>
            </div>
          </div>
        ) : currentFolder ? (
          <div>
            <button
              onClick={() => setCurrentFolder(null)}
              className="mb-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              ← Back to Folders
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center">
              {currentFolder === 'local' ? 'Local Photos' : 'Online Photos'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {getPhotosForFolder().map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group cursor-pointer"
                >
                  <div className={`aspect-square rounded-xl overflow-hidden transform group-hover:scale-105 transition-all border border-white/10 ${
                    currentFolder === 'local' ? 'bg-gradient-to-br from-green-500 to-emerald-400' : 'bg-gradient-to-br from-blue-500 to-purple-400'
                  }`}>
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = '<span class="text-4xl">📷</span>'
                      }}
                    />
                  </div>
                  <p className="text-sm mt-2 text-gray-300 text-center">{photo.title}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photoFolders.map((folder) => (
              <div
                key={folder.id}
                onClick={() => setCurrentFolder(folder.platform === 'local-folder' ? 'local' : 'online')}
                className="group cursor-pointer"
              >
                <div className={`bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all`}>
                  <img src={folder.cover} alt={folder.title} className="w-full h-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{folder.title}</h3>
                    <p className="text-gray-400 mt-2">Click to browse</p>
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

export default Photos
