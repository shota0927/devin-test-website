import { useState } from 'react';
import { useVideos } from '../context/VideoContext';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { VideoCard } from '../components/VideoCard';
import { Loader2 } from 'lucide-react';

export function TopPage() {
  const { videos, tags, loading, error } = useVideos();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'views' | 'date'>('views');
  
  const filteredVideos = selectedTag
    ? videos.filter(video => video.tags.includes(selectedTag))
    : videos;
    
  const sortedVideos = [...filteredVideos].sort((a, b) => {
    if (sortBy === 'views') {
      return b.views - a.views;
    } else {
      return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    }
  });
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };
  
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
      <div className="flex flex-col space-y-6">
        {/* Tags Section */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Filter by Tags</h2>
          <div className="flex flex-wrap gap-2 md:flex-row flex-col md:items-center items-start">
            {tags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer px-3 py-1 text-sm capitalize"
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTag && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTag(null)}
                className="text-sm"
              >
                Clear Filter
              </Button>
            )}
          </div>
        </div>
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Discover Amazing Videos</h2>
          <p className="mb-4">Explore our collection of high-quality videos across various categories.</p>
          <Button variant="secondary" asChild>
            <a href="#videos">Browse Now</a>
          </Button>
        </div>
        
        {/* Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold" id="videos">Videos</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as 'views' | 'date')}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="views">Most Viewed</SelectItem>
                <SelectItem value="date">Latest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Videos Grid */}
        {sortedVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No videos found. Try changing your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
