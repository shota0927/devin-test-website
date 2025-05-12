import { useState, useMemo } from "react";
import { VideoGrid } from "../components/VideoGrid";
import { videos, getAllTags } from "../data/videos";
import { Badge } from "../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";

export function TopPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"views" | "date">("views");
  
  const allTags = getAllTags();
  
  const filteredAndSortedVideos = useMemo(() => {
    let filtered = videos;
    if (selectedTags.length > 0) {
      filtered = videos.filter(video => 
        selectedTags.every(tag => video.tags.includes(tag))
      );
    }
    
    return [...filtered].sort((a, b) => {
      if (sortBy === "views") {
        return b.views - a.views;
      } else {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      }
    });
  }, [selectedTags, sortBy]);
  
  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Video Library</h1>
      
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Filter by Tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {selectedTags.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear filters
              </Button>
            )}
            
            <div className="flex flex-col">
              <span className="text-sm font-medium mb-1">Sort by</span>
              <Select 
                value={sortBy} 
                onValueChange={(value) => setSortBy(value as "views" | "date")}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="views">Most Views</SelectItem>
                  <SelectItem value="date">Latest Uploads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold mb-2">Discover Amazing Videos</h2>
          <p className="text-lg opacity-90">Explore our collection of high-quality videos from around the world.</p>
          <p className="mt-2">Don't forget to favorite the videos you love!</p>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-500">
          Showing {filteredAndSortedVideos.length} videos
          {selectedTags.length > 0 && (
            <span> filtered by {selectedTags.join(", ")}</span>
          )}
        </p>
      </div>
      
      <VideoGrid videos={filteredAndSortedVideos} />
    </div>
  );
}
