import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Helper function to get latest game images
const getLatestGameImages = () => {
  const gamesDir = path.resolve(__dirname, 'public/games')
  const files = fs.readdirSync(gamesDir)
  const imageFiles = files
    .filter(file => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file))
    .map(file => {
      const filePath = path.join(gamesDir, file)
      const stats = fs.statSync(filePath)
      return {
        name: file,
        path: `/games/${file}`,
        modified: stats.mtime.getTime()
      }
    })
    .sort((a, b) => b.modified - a.modified) // Sort by modification time (newest first)
    .map(item => item.path)
  return imageFiles
}

// Pre-build: generate a JSON file with latest game images
const generateGamesManifest = () => {
  const imageFiles = getLatestGameImages()
  const manifestPath = path.resolve(__dirname, 'public/api/games-images.json')

  // Ensure api directory exists in public
  const apiDir = path.dirname(manifestPath)
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true })
    console.log('Created api directory:', apiDir)
  }

  fs.writeFileSync(manifestPath, JSON.stringify(imageFiles))
  console.log('Generated games manifest:', manifestPath)
  console.log('Manifest content:', JSON.stringify(imageFiles))
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'list-files-plugin',
      configureServer(server) {
        // Generate manifest when dev server starts
        generateGamesManifest()

        server.middlewares.use('/api/games-images', (req, res) => {
          try {
            const imageFiles = getLatestGameImages()
            console.log('Game images requested:', imageFiles)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(imageFiles))
          } catch (error) {
            console.error('Error reading games directory:', error)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to read games directory', details: error.message }))
          }
        })

        server.middlewares.use('/api/reload-games', (req, res) => {
          try {
            const imageFiles = getLatestGameImages()
            // Also regenerate the manifest file
            generateGamesManifest()
            console.log('Games reloaded:', imageFiles)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true, images: imageFiles }))
          } catch (error) {
            console.error('Error reloading games:', error)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to reload games' }))
          }
        })
      },
      closeBundle() {
        generateGamesManifest()
      }
    }
  ],
})
