from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class VideoBase(BaseModel):
    title: str
    thumbnailUrl: str
    videoUrl: str
    tags: List[str]
    views: int
    uploadDate: str

class VideoCreate(VideoBase):
    pass

class Video(VideoBase):
    id: int

    class Config:
        from_attributes = True

class FavoriteCreate(BaseModel):
    videoId: int

class Favorite(BaseModel):
    id: int
    videoId: int

    class Config:
        from_attributes = True
