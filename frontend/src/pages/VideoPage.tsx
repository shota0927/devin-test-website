import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Loader2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { VideoCard } from '../components/VideoCard';
import { useFavorites } from '../context/FavoritesContext';
import { useViews } from '../context/ViewsContext';
import { getVideoById, getRelatedVideos, Video } from '../api/videoApi';

export function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const videoId = parseInt(id || '0');
  const { isFavorite, toggleFavorite } = useFavorites();
  const { incrementViews } = useViews();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [videoData, relatedVideosData] = await Promise.all([
          getVideoById(videoId),
          getRelatedVideos(videoId)
        ]);
        setVideo(videoData);
        setRelatedVideos(relatedVideosData);
        setError(null);
      } catch (err) {
        console.error('Error fetching video data:', err);
        setError('Failed to load video. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [videoId]);
  
  useEffect(() => {
    const handlePlay = () => {
      incrementViews(videoId);
    };
    
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('play', handlePlay);
      return () => {
        videoElement.removeEventListener('play', handlePlay);
      };
    }
  }, [videoId, incrementViews]);
  
  const handleFavoriteClick = () => {
    toggleFavorite(videoId);
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (error || !video) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error || 'Video not found'}
        </div>
        <Link to="/" className="mt-4 inline-block">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to videos
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-video bg-black mb-4 overflow-hidden rounded-lg">
            <video 
              ref={videoRef}
              src={video.videoUrl} 
              controls 
              className="w-full h-full"
              poster={video.thumbnailUrl}
            />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <Button 
              variant={isFavorite(videoId) ? "default" : "outline"}
              size="sm"
              className={`flex items-center gap-1 ${isFavorite(videoId) ? 'bg-red-500 hover:bg-red-600 border-red-500' : ''}`}
              onClick={handleFavoriteClick}
            >
              <Heart className={`h-4 w-4 ${isFavorite(videoId) ? 'fill-white' : ''}`} />
              {isFavorite(videoId) ? 'Favorited' : 'Add to favorites'}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center text-gray-600">
              <span className="mr-4">{new Date(video.uploadDate).toLocaleDateString()}</span>
              <span>{video.views.toLocaleString()} views</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {video.tags.map(tag => (
                <Link to={`/tag/${tag}`} key={tag}>
                  <Badge variant="secondary" className="hover:bg-slate-200 cursor-pointer">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Related Videos</h2>
          <div className="space-y-4">
            {relatedVideos.length > 0 ? (
              relatedVideos.map(relatedVideo => (
                <VideoCard key={relatedVideo.id} video={relatedVideo} />
              ))
            ) : (
              <p className="text-gray-500">No related videos found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
