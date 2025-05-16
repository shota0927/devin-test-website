import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter } from './ui/card';
import { useFavorites } from '../context/FavoritesContext';
import { Video } from '../api/videoApi';

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(video.id);
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/video/${video.id}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          <button 
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-1.5 rounded-full ${
              isFavorite(video.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite(video.id) ? 'fill-white' : ''}`} />
          </button>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{video.title}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{video.views.toLocaleString()} views</span>
            <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
          </div>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex flex-wrap gap-1">
          {video.tags.map(tag => (
            <Link 
              key={tag} 
              to={`/tag/${tag}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-block"
            >
              <Badge variant="secondary" className="hover:bg-slate-200 cursor-pointer">
                {tag}
              </Badge>
            </Link>
          ))}
        </CardFooter>
      </Link>
    </Card>
  );
}
