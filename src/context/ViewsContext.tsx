import { createContext, useState, useContext, ReactNode } from 'react';
import { videos } from '../data/videos';

interface ViewsContextType {
  incrementViews: (videoId: number) => void;
  getVideoViews: (videoId: number) => number;
}

const ViewsContext = createContext<ViewsContextType | undefined>(undefined);

export function ViewsProvider({ children }: { children: ReactNode }) {
  const [videoViews, setVideoViews] = useState<Record<number, number>>(() => {
    const initialViews: Record<number, number> = {};
    videos.forEach(video => {
      initialViews[video.id] = video.views;
    });
    
    const savedViews = localStorage.getItem('videoViews');
    if (savedViews) {
      return { ...initialViews, ...JSON.parse(savedViews) };
    }
    
    return initialViews;
  });

  const incrementViews = (videoId: number) => {
    setVideoViews(prevViews => {
      const currentViews = prevViews[videoId] || 0;
      const newViews = { ...prevViews, [videoId]: currentViews + 1 };
      
      localStorage.setItem('videoViews', JSON.stringify(newViews));
      return newViews;
    });
  };

  const getVideoViews = (videoId: number) => {
    return videoViews[videoId] || 0;
  };

  return (
    <ViewsContext.Provider value={{ incrementViews, getVideoViews }}>
      {children}
    </ViewsContext.Provider>
  );
}

export function useViews() {
  const context = useContext(ViewsContext);
  if (context === undefined) {
    throw new Error('useViews must be used within a ViewsProvider');
  }
  return context;
}
