import { createContext, useContext, ReactNode } from 'react';
import { incrementViews as apiIncrementViews } from '../api/videoApi';

type UpdateVideoViewCountFn = (videoId: number, newViewCount: number) => void;

interface ViewsContextType {
  incrementViews: (videoId: number) => Promise<number>;
}

const ViewsContext = createContext<ViewsContextType | undefined>(undefined);

interface ViewsProviderProps {
  children: ReactNode;
  updateVideoViewCount: UpdateVideoViewCountFn;
}

export function ViewsProvider({ children, updateVideoViewCount }: ViewsProviderProps) {
  const incrementViews = async (videoId: number): Promise<number> => {
    try {
      console.log('ViewsContext: Incrementing views for video', videoId);
      const newViewCount = await apiIncrementViews(videoId);
      console.log('ViewsContext: Received new view count from API:', newViewCount);
      updateVideoViewCount(videoId, newViewCount);
      return newViewCount;
    } catch (err) {
      console.error('Error incrementing views:', err);
      throw err;
    }
  };

  return (
    <ViewsContext.Provider value={{ incrementViews }}>
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
