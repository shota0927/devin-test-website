import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Video, getVideos, getTags } from '../api/videoApi';

interface VideoContextType {
  videos: Video[];
  tags: string[];
  loading: boolean;
  error: string | null;
  updateVideoViewCount: (videoId: number, newViewCount: number) => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [videosData, tagsData] = await Promise.all([
          getVideos(),
          getTags()
        ]);
        setVideos(videosData);
        setTags(tagsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateVideoViewCount = (videoId: number, newViewCount: number) => {
    console.log('VideoContext: Updating view count for video', videoId, 'to', newViewCount);
    if (videos.length > 0) {
      const updatedVideos = videos.map(video => 
        video.id === videoId ? { ...video, views: newViewCount } : video
      );
      console.log('VideoContext: Setting updated videos state');
      setVideos(updatedVideos);
    } else {
      console.warn('VideoContext: No videos in state to update');
    }
  };

  return (
    <VideoContext.Provider value={{ videos, tags, loading, error, updateVideoViewCount }}>
      {children}
    </VideoContext.Provider>
  );
}

export function useVideos() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
}
