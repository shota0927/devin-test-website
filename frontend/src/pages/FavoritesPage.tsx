import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { VideoCard } from '../components/VideoCard';
import { useFavorites } from '../context/FavoritesContext';
import { useVideos } from '../context/VideoContext';
import { Video } from '../api/videoApi';

export function FavoritesPage() {
  const { favorites, loading: favoritesLoading, error: favoritesError } = useFavorites();
  const { videos, loading: videosLoading, error: videosError } = useVideos();
  const [favoriteVideos, setFavoriteVideos] = useState<Video[]>([]);
  
  useEffect(() => {
    if (!videosLoading && !favoritesLoading) {
      const filteredVideos = videos.filter(video => favorites.includes(video.id));
      setFavoriteVideos(filteredVideos);
    }
  }, [videos, favorites, videosLoading, favoritesLoading]);
  
  const loading = videosLoading || favoritesLoading;
  const error = videosError || favoritesError;
  
  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Link to="/" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Your Favorite Videos</h1>
      </div>
      
      {favoriteVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">You haven't added any videos to your favorites yet.</p>
          <Link to="/" className="mt-4 inline-block">
            <Button>Browse Videos</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
