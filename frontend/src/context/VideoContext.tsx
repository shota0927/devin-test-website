import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Video, getVideos, getTags } from '../api/videoApi';

interface VideoContextType {
  videos: Video[];
  tags: string[];
  loading: boolean;
  error: string | null;
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

  return (
    <VideoContext.Provider value={{ videos, tags, loading, error }}>
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
