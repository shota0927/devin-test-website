import { useParams, Link } from "react-router-dom";
import { VideoGrid } from "../components/VideoGrid";
import { getVideosByTag } from "../data/videos";
import { ArrowLeft } from "lucide-react";

export function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const videos = tag ? getVideosByTag(tag) : [];
  
  return (
    <div className="container mx-auto py-8 px-4">
      <Link to="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to videos
      </Link>
      
      <h1 className="text-3xl font-bold mb-8">
        Videos tagged with <span className="text-blue-600">#{tag}</span>
      </h1>
      
      {videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No videos found with this tag</p>
        </div>
      )}
    </div>
  );
}
