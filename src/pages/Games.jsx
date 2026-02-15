import { useState } from 'react'

const games = [
  {
    id: 1,
    title: 'Space Adventure',
    description: 'An exciting space exploration game',
    genre: 'Action',
    thumbnail: 'https://via.placeholder.com/600x400?text=Game+1',
    embedUrl: null,
    playUrl: '#'
  },
  {
    id: 2,
    title: 'Puzzle Master',
    description: 'Challenge your mind with puzzles',
    genre: 'Puzzle',
    thumbnail: 'https://via.placeholder.com/600x400?text=Game+2',
    embedUrl: null,
    playUrl: '#'
  },
  {
    id: 3,
    title: 'Racing Champions',
    description: 'High-speed racing action',
    genre: 'Racing',
    thumbnail: 'https://via.placeholder.com/600x400?text=Game+3',
    embedUrl: null,
    playUrl: '#'
  },
  {
    id: 4,
    title: 'Fantasy Quest',
    description: 'Epic RPG adventure',
    genre: 'RPG',
    thumbnail: 'https://via.placeholder.com/600x400?text=Game+4',
    embedUrl: null,
    playUrl: '#'
  },
]

function Games() {
  const [selectedGame, setSelectedGame] = useState(null)

  return (
    <div className="pt-24 px-6 pb-12">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
          Game Zone
        </h1>
        <p className="text-gray-400 text-center mb-12">Play games I've created</p>

        {selectedGame ? (
          <div className="mb-8">
            <button
              onClick={() => setSelectedGame(null)}
              className="mb-4 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              ← Back to All Games
            </button>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 max-w-4xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                <span className="text-6xl">🎮</span>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">{selectedGame.title}</h2>
                <p className="text-gray-300 mb-4">{selectedGame.description}</p>
                <span className="inline-block px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm">
                  {selectedGame.genre}
                </span>
                <button className="ml-4 px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-full font-semibold transition-all transform hover:scale-105">
                  Play Now
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 transform group-hover:scale-105 transition-all">
                  <div className="aspect-video bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <span className="text-6xl">🎮</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{game.title}</h3>
                    <p className="text-gray-400 mb-4">{game.description}</p>
                    <span className="inline-block px-4 py-2 bg-red-500/20 text-red-400 rounded-full text-sm">
                      {game.genre}
                    </span>
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

export default Games
