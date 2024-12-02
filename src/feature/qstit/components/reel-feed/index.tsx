"use client";
import { useState, useRef, useCallback } from "react";

import { useGetVideosQuery } from "@/redux/features-slices/booking/VideoApiSlice";
import { VideoReel } from "./video-reel";

export function ReelsFeed() {
  const { data, error, isLoading } = useGetVideosQuery({ page: 1, pageSize: 10 });
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (containerRef.current && data?.length) {
      const scrollTop = containerRef.current.scrollTop;
      const itemHeight = containerRef.current.clientHeight;
      const index = Math.round(scrollTop / itemHeight);
      const newActiveReelId = data[index]?.id || null;
      setActiveReelId(newActiveReelId);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reels.</div>;

  return (
    <div
      ref={containerRef}
      className="snap-y snap-mandatory h-full overflow-y-auto scrollbar-hide"
      onScroll={handleScroll}
    >
      {data?.length > 0 ? (
        data.map((reel: any) => (
          <VideoReel
            key={reel.id}
            videoSrc={reel.video_file}
            username={`${reel.post.doctor.user.first_name} ${reel.post.doctor.user.last_name}`}
            caption={reel.post.title}
            likes={reel.likes || 0}
            isActive={reel.id === activeReelId}
            {...reel}
          />
        ))
      ) : (
        <div>No videos available.</div>
      )}
    </div>
  );
}
