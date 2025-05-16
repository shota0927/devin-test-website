import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../api/videoApi';

interface FavoritesContextType {
  favorites: number[];
  loading: boolean;
  error: string | null;
  toggleFavorite: (videoId: number) => Promise<void>;
  isFavorite: (videoId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const DEFAULT_USER_ID = 1;

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const favoritesData = await getFavorites(DEFAULT_USER_ID);
        setFavorites(favoritesData.map(video => video.id));
        setError(null);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorites. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (videoId: number) => {
    try {
      if (favorites.includes(videoId)) {
        await removeFavorite(videoId, DEFAULT_USER_ID);
        setFavorites(prevFavorites => prevFavorites.filter(id => id !== videoId));
      } else {
        await addFavorite(videoId, DEFAULT_USER_ID);
        setFavorites(prevFavorites => [...prevFavorites, videoId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setError('Failed to update favorite. Please try again later.');
    }
  };

  const isFavorite = (videoId: number) => favorites.includes(videoId);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, error, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
