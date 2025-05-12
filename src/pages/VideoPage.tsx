import { useParams, Link } from "react-router-dom";
import { videos, getRelatedVideos } from "../data/videos";
import { VideoCard } from "../components/VideoCard";
import { Badge } from "../components/ui/badge";
import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "../components/ui/button";
import { useFavorites } from "../context/FavoritesContext";

export function VideoPage() {
  const { id } = useParams<{ id: string }>();
  const videoId = parseInt(id || "0");
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const video = videos.find(v => v.id === videoId);
  const relatedVideos = getRelatedVideos(videoId);
  
  const handleFavoriteClick = () => {
    toggleFavorite(videoId);
  };
  
  if (!video) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Video not found</h1>
        <Link to="/">
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
