import { useFavorites } from "../context/FavoritesContext";
import { VideoGrid } from "../components/VideoGrid";
import { videos } from "../data/videos";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const favoriteVideos = videos.filter(video => favorites.includes(video.id));
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to videos
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">Your Favorite Videos</h1>
      
      {favoriteVideos.length > 0 ? (
        <>
          <p className="text-gray-500 mb-6">You have {favoriteVideos.length} favorite videos</p>
          <VideoGrid videos={favoriteVideos} />
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500 mb-4">You haven't added any favorites yet</p>
          <p className="text-gray-400">
            Click the heart icon on videos you like to add them to your favorites
          </p>
          <Link to="/" className="mt-6 inline-block text-blue-600 hover:underline">
            Browse videos
          </Link>
        </div>
      )}
    </div>
  );
}
