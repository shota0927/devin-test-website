from fastapi import FastAPI, HTTPException, Query, Path
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import psycopg

from app.models import Video, FavoriteCreate
from app.database import db

app = FastAPI(title="Video Listing API")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/healthz")
async def healthz():
    return {"status": "ok"}

@app.get("/videos", response_model=List[Video])
async def get_videos():
    return db.get_all_videos()

@app.get("/videos/{video_id}", response_model=Video)
async def get_video(video_id: int = Path(..., description="The ID of the video to get")):
    video = db.get_video_by_id(video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return video

@app.get("/videos/tag/{tag}", response_model=List[Video])
async def get_videos_by_tag(tag: str = Path(..., description="The tag to filter videos by")):
    return db.get_videos_by_tag(tag)

@app.post("/videos/{video_id}/view")
async def increment_view(video_id: int = Path(..., description="The ID of the video to increment views for")):
    video = db.increment_views(video_id)
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    return {"success": True, "views": video.views}

@app.get("/tags", response_model=List[str])
async def get_tags():
    return db.get_all_tags()

@app.get("/videos/{video_id}/related", response_model=List[Video])
async def get_related_videos(
    video_id: int = Path(..., description="The ID of the video to get related videos for"),
    limit: int = Query(4, description="Maximum number of related videos to return")
):
    return db.get_related_videos(video_id, limit)

@app.post("/favorites/{user_id}/{video_id}")
async def add_favorite(
    user_id: int = Path(..., description="The ID of the user"),
    video_id: int = Path(..., description="The ID of the video to favorite")
):
    success = db.add_favorite(user_id, video_id)
    if not success:
        raise HTTPException(status_code=404, detail="Video not found")
    return {"success": True}

@app.delete("/favorites/{user_id}/{video_id}")
async def remove_favorite(
    user_id: int = Path(..., description="The ID of the user"),
    video_id: int = Path(..., description="The ID of the video to unfavorite")
):
    success = db.remove_favorite(user_id, video_id)
    if not success:
        raise HTTPException(status_code=404, detail="Favorite not found")
    return {"success": True}

@app.get("/favorites/{user_id}", response_model=List[Video])
async def get_favorites(user_id: int = Path(..., description="The ID of the user")):
    return db.get_favorites(user_id)

@app.get("/favorites/{user_id}/{video_id}")
async def is_favorite(
    user_id: int = Path(..., description="The ID of the user"),
    video_id: int = Path(..., description="The ID of the video to check")
):
    return {"is_favorite": db.is_favorite(user_id, video_id)}
