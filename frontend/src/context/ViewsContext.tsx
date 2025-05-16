import { createContext, useContext, ReactNode } from 'react';
import { incrementViews as apiIncrementViews } from '../api/videoApi';

interface ViewsContextType {
  incrementViews: (videoId: number) => Promise<void>;
}

const ViewsContext = createContext<ViewsContextType | undefined>(undefined);

export function ViewsProvider({ children }: { children: ReactNode }) {
  const incrementViews = async (videoId: number) => {
    try {
      await apiIncrementViews(videoId);
    } catch (err) {
      console.error('Error incrementing views:', err);
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
