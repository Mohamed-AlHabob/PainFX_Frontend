"use client";

import InfiniteScrollObserver from "@/components/global/infinite-scroll";
import { PostCard } from "./post-card";
import { useGetPostsQuery } from "@/redux/features-slices/booking/PostApiSlice";

export const PostFeed = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery("");

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>Failed to load posts. Please try again later.</p>;
  }

  console.log(posts.results);

  return (
    <>
      {posts && Array.isArray(posts) && posts.map((post) => (
        <PostCard
          key={post.id}
          channelname={post.c || "Unknown Channel"}
          title={post.results.title || "Untitled Post"}
          content={post.content || "No content available"}
          userimage={post.author?.profileImage || "/default-avatar.svg"}
          likes={post.likesCount || 0}
          comments={post.commentsCount || 0}
          postid={post.id}
          likedUser={post.likedUser ? "true" : "false"}
          userid={post.author?.id || "Unknown User"}
          likeid={post.likeId || null}
          userId={post.author?.id || ""}
          first_name={post.results.doctor?.user?.first_name || "First Name"}
          last_name={post.doctor?.user?.last_name || "Last Name"}
          specialization={post.doctor?.specialization || "Specialization not provided"}
        />
      ))}
      <InfiniteScrollObserver
        action="POSTS"
        loading="POST"
        paginate={2} children={undefined}      />
    </>
  );
};
