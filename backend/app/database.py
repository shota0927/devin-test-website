from typing import Dict, List, Optional
import json
from app.models import Video, Favorite

class Database:
    def __init__(self):
        self.videos: Dict[int, Video] = {}
        self.favorites: Dict[int, List[int]] = {}  # user_id -> list of video_ids
        self.next_video_id = 1
        self.initialize_sample_data()
    
    def initialize_sample_data(self):
        sample_videos = [
            {
                "title": "Beautiful Sunset at the Beach",
                "thumbnailUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
                "tags": ["nature"],
                "views": 1250,
                "uploadDate": "2025-05-01"
            },
            {
                "title": "Mountain Hiking Adventure",
                "thumbnailUrl": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
                "tags": ["nature"],
                "views": 850,
                "uploadDate": "2025-04-28"
            },
            {
                "title": "City Lights at Night",
                "thumbnailUrl": "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
                "tags": ["urban"],
                "views": 2100,
                "uploadDate": "2025-04-25"
            },
            {
                "title": "Cooking Italian Pasta",
                "thumbnailUrl": "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
                "tags": ["food"],
                "views": 1800,
                "uploadDate": "2025-04-20"
            },
            {
                "title": "Drone Footage of Forest",
                "thumbnailUrl": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
                "tags": ["nature"],
                "views": 950,
                "uploadDate": "2025-04-15"
            },
            {
                "title": "Surfing Big Waves",
                "thumbnailUrl": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
                "tags": ["sports"],
                "views": 1650,
                "uploadDate": "2025-04-10"
            },
            {
                "title": "Wildlife Safari",
                "thumbnailUrl": "https://images.unsplash.com/photo-1535941339077-2dd1c7963098?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
                "tags": ["nature"],
                "views": 2250,
                "uploadDate": "2025-04-05"
            },
            {
                "title": "Modern Architecture Tour",
                "thumbnailUrl": "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-15s.mp4",
                "tags": ["urban"],
                "views": 780,
                "uploadDate": "2025-04-01"
            },
            {
                "title": "Yoga Morning Routine",
                "thumbnailUrl": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
                "tags": ["sports"],
                "views": 1450,
                "uploadDate": "2025-03-28"
            },
            {
                "title": "Space Exploration Documentary",
                "thumbnailUrl": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-30s.mp4",
                "tags": ["urban"],
                "views": 3200,
                "uploadDate": "2025-03-25"
            },
            {
                "title": "Street Food Festival",
                "thumbnailUrl": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
                "tags": ["food"],
                "views": 890,
                "uploadDate": "2025-03-20"
            },
            {
                "title": "Classical Music Concert",
                "thumbnailUrl": "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop",
                "videoUrl": "https://samplelib.com/lib/preview/mp4/sample-10s.mp4",
                "tags": ["urban"],
                "views": 760,
                "uploadDate": "2025-03-15"
            }
        ]
        
        for video_data in sample_videos:
            self.add_video(video_data)
    
    def add_video(self, video_data: dict) -> Video:
        video = Video(id=self.next_video_id, **video_data)
        self.videos[self.next_video_id] = video
        self.next_video_id += 1
        return video
    
    def get_all_videos(self) -> List[Video]:
        return list(self.videos.values())
    
    def get_video_by_id(self, video_id: int) -> Optional[Video]:
        return self.videos.get(video_id)
    
    def get_videos_by_tag(self, tag: str) -> List[Video]:
        return [video for video in self.videos.values() if tag in video.tags]
    
    def increment_views(self, video_id: int) -> Optional[Video]:
        video = self.videos.get(video_id)
        if video:
            video.views += 1
            return video
        return None
    
    def get_all_tags(self) -> List[str]:
        tags_set = set()
        for video in self.videos.values():
            for tag in video.tags:
                tags_set.add(tag)
        return list(tags_set)
    
    def get_related_videos(self, video_id: int, limit: int = 4) -> List[Video]:
        video = self.videos.get(video_id)
        if not video:
            return []
        
        related = []
        for other_video in self.videos.values():
            if other_video.id != video_id and any(tag in video.tags for tag in other_video.tags):
                related.append(other_video)
                if len(related) >= limit:
                    break
        
        return related
    
    def add_favorite(self, user_id: int, video_id: int) -> bool:
        if video_id not in self.videos:
            return False
        
        if user_id not in self.favorites:
            self.favorites[user_id] = []
        
        if video_id not in self.favorites[user_id]:
            self.favorites[user_id].append(video_id)
        
        return True
    
    def remove_favorite(self, user_id: int, video_id: int) -> bool:
        if user_id not in self.favorites:
            return False
        
        if video_id in self.favorites[user_id]:
            self.favorites[user_id].remove(video_id)
            return True
        
        return False
    
    def get_favorites(self, user_id: int) -> List[Video]:
        if user_id not in self.favorites:
            return []
        
        return [self.videos[video_id] for video_id in self.favorites[user_id] if video_id in self.videos]
    
    def is_favorite(self, user_id: int, video_id: int) -> bool:
        return user_id in self.favorites and video_id in self.favorites[user_id]

db = Database()
