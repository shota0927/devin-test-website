import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { VideoCard } from '../components/VideoCard';
import { getVideosByTag, Video } from '../api/videoApi';

export function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchVideos = async () => {
      if (!tag) return;
      
      try {
        setLoading(true);
        const data = await getVideosByTag(tag);
        setVideos(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching videos by tag:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideos();
  }, [tag]);
  
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
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold capitalize">
            <span className="text-gray-500">Tag:</span> {tag}
          </h1>
        </div>
      </div>
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No videos found with this tag.</p>
          <Link to="/" className="mt-4 inline-block">
            <Button>Browse All Videos</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
