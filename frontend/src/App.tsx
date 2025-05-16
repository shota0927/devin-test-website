import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import './App.css'

import { VideoProvider } from './context/VideoContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ViewsContextConnector } from './context/ViewsContextConnector'
import { TopPage } from './pages/TopPage'
import { VideoPage } from './pages/VideoPage'
import { TagPage } from './pages/TagPage'
import { FavoritesPage } from './pages/FavoritesPage'

function App() {
  return (
    <VideoProvider>
      <FavoritesProvider>
        <ViewsContextConnector>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <header className="bg-white shadow-sm">
                <div className="container mx-auto py-4 px-4 flex justify-between items-center">
                  <Link to="/" className="text-2xl font-bold text-blue-600">VideoHub</Link>
                  <Link to="/favorites" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <Heart className="h-5 w-5 mr-1" />
                    Favorites
                  </Link>
                </div>
              </header>
              
              <main>
                <Routes>
                  <Route path="/" element={<TopPage />} />
                  <Route path="/video/:id" element={<VideoPage />} />
                  <Route path="/tag/:tag" element={<TagPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                </Routes>
              </main>
              
              <footer className="bg-white border-t mt-12 py-6">
                <div className="container mx-auto px-4 text-center text-gray-500">
                  <p>© 2025 VideoHub - Video Listing Website</p>
                </div>
              </footer>
            </div>
          </Router>
        </ViewsContextConnector>
      </FavoritesProvider>
    </VideoProvider>
  )
}

export default App
