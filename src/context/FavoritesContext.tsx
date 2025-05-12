import { createContext, useState, useContext, ReactNode } from 'react';

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (videoId: number) => void;
  isFavorite: (videoId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const toggleFavorite = (videoId: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(videoId)
        ? prevFavorites.filter(id => id !== videoId)
        : [...prevFavorites, videoId];
      
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (videoId: number) => favorites.includes(videoId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
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
