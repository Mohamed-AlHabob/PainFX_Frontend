import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { VideoPlayer } from "./video-player";


interface VideoReelProps {
  videoSrc: string;
  username: string;
  caption: string;
  likes: number;
  isActive: boolean;
}

export function VideoReel({
  videoSrc,
  username,
  caption,
  likes,
  isActive,
}: VideoReelProps) {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative w-full h-full max-h-max group">
      <VideoPlayer src={videoSrc} isActive={isActive} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h2 className="font-semibold text-lg">{username}</h2>
        <p className="text-sm mt-1 line-clamp-2">{caption}</p>
      </div>
      <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-4">
        <button
          className="text-white transition-transform duration-200 hover:scale-110"
          onClick={toggleLike}
        >
          <Heart
            size={28}
            fill={isLiked ? "red" : "none"}
            color={isLiked ? "red" : "white"}
          />
        </button>
        <span className="text-white text-sm">{isLiked ? likes + 1 : likes}</span>
        <button className="text-white transition-transform duration-200 hover:scale-110">
          <MessageCircle size={28} />
        </button>
        <button className="text-white transition-transform duration-200 hover:scale-110">
          <Send size={28} />
        </button>
        <button className="text-white transition-transform duration-200 hover:scale-110">
          <Bookmark size={28} />
        </button>
      </div>
    </div>
  );
}
