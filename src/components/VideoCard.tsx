import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Video } from "../data/videos";
import { useFavorites } from "../context/FavoritesContext";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isVideoFavorite = isFavorite(video.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(video.id);
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/video/${video.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center">
            <Eye className="h-3 w-3 mr-1" />
            {video.views.toLocaleString()}
          </div>
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-2 rounded-full ${isVideoFavorite ? 'bg-red-500' : 'bg-black/50 hover:bg-black/70'}`}
          >
            <Heart 
              className={`h-4 w-4 ${isVideoFavorite ? 'fill-white text-white' : 'text-white'}`} 
            />
          </button>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link to={`/video/${video.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
        </Link>
        <div className="flex flex-wrap gap-1 mt-2">
          {video.tags.map((tag) => (
            <Link to={`/tag/${tag}`} key={tag}>
              <Badge variant="secondary" className="hover:bg-slate-200 cursor-pointer">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {new Date(video.uploadDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
