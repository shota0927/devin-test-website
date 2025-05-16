export interface Video {
  id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  tags: string[];
  views: number;
  uploadDate: string;
}

export const videos: Video[] = [
  {
    id: 1,
    title: "Beautiful Sunset at the Beach",
    thumbnailUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    tags: ["nature"],
    views: 1250,
    uploadDate: "2025-05-01"
  },
  {
    id: 2,
    title: "Mountain Hiking Adventure",
    thumbnailUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    tags: ["nature"],
    views: 850,
    uploadDate: "2025-04-28"
  },
  {
    id: 3,
    title: "City Lights at Night",
    thumbnailUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    tags: ["urban"],
    views: 2100,
    uploadDate: "2025-04-25"
  },
  {
    id: 4,
    title: "Cooking Italian Pasta",
    thumbnailUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    tags: ["food"],
    views: 1800,
    uploadDate: "2025-04-20"
  },
  {
    id: 5,
    title: "Drone Footage of Forest",
    thumbnailUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    tags: ["nature"],
    views: 950,
    uploadDate: "2025-04-15"
  },
  {
    id: 6,
    title: "Surfing Big Waves",
    thumbnailUrl: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    tags: ["sports"],
    views: 1650,
    uploadDate: "2025-04-10"
  },
  {
    id: 7,
    title: "Wildlife Safari",
    thumbnailUrl: "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    tags: ["nature"],
    views: 2250,
    uploadDate: "2025-04-05"
  },
  {
    id: 8,
    title: "Modern Architecture Tour",
    thumbnailUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
    tags: ["urban"],
    views: 780,
    uploadDate: "2025-04-01"
  },
  {
    id: 9,
    title: "Yoga Morning Routine",
    thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
    tags: ["sports"],
    views: 1450,
    uploadDate: "2025-03-28"
  },
  {
    id: 10,
    title: "Space Exploration Documentary",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
    tags: ["urban"],
    views: 3200,
    uploadDate: "2025-03-25"
  },
  {
    id: 11,
    title: "Street Food Festival",
    thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    tags: ["food"],
    views: 890,
    uploadDate: "2025-03-20"
  },
  {
    id: 12,
    title: "Classical Music Concert",
    thumbnailUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
    videoUrl: "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
    tags: ["urban"],
    views: 760,
    uploadDate: "2025-03-15"
  }
];

export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();
  videos.forEach(video => {
    video.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
};

export const getVideosByTag = (tag: string): Video[] => {
  return videos.filter(video => video.tags.includes(tag));
};

export const getRelatedVideos = (videoId: number): Video[] => {
  const currentVideo = videos.find(v => v.id === videoId);
  if (!currentVideo) return [];
  
  return videos
    .filter(video => 
      video.id !== videoId && 
      video.tags.some(tag => currentVideo.tags.includes(tag))
    )
    .slice(0, 4); // Return up to 4 related videos
};
