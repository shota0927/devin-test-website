import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags: string[];
  views: number;
  uploadDate: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getVideos = async (): Promise<Video[]> => {
  const response = await api.get('/videos');
  return response.data;
};

export const getVideoById = async (id: number): Promise<Video> => {
  const response = await api.get(`/videos/${id}`);
  return response.data;
};

export const getVideosByTag = async (tag: string): Promise<Video[]> => {
  const response = await api.get(`/videos/tag/${tag}`);
  return response.data;
};

export const incrementViews = async (id: number): Promise<number> => {
  const response = await api.post(`/videos/${id}/view`);
  return response.data.views;
};

export const getRelatedVideos = async (id: number, limit: number = 4): Promise<Video[]> => {
  const response = await api.get(`/videos/${id}/related?limit=${limit}`);
  return response.data;
};

export const getTags = async (): Promise<string[]> => {
  const response = await api.get('/tags');
  return response.data;
};

const DEFAULT_USER_ID = 1;

export const addFavorite = async (videoId: number, userId: number = DEFAULT_USER_ID): Promise<boolean> => {
  const response = await api.post(`/favorites/${userId}/${videoId}`);
  return response.data.success;
};

export const removeFavorite = async (videoId: number, userId: number = DEFAULT_USER_ID): Promise<boolean> => {
  const response = await api.delete(`/favorites/${userId}/${videoId}`);
  return response.data.success;
};

export const getFavorites = async (userId: number = DEFAULT_USER_ID): Promise<Video[]> => {
  const response = await api.get(`/favorites/${userId}`);
  return response.data;
};

export const isFavorite = async (videoId: number, userId: number = DEFAULT_USER_ID): Promise<boolean> => {
  const response = await api.get(`/favorites/${userId}/${videoId}`);
  return response.data.is_favorite;
};
