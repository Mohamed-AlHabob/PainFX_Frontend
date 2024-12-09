"use client";

import InfiniteScrollObserver from "@/components/global/infinite-scroll";
import { PostCard } from "./post-card";
import { useGetPostsQuery } from "@/redux/features-slices/booking/PostApiSlice";
import { Loader } from "@/components/global/loader";

export const PostFeed = () => {
  // Fetch posts data using RTK Query
  const { data: postsData, isLoading, error } = useGetPostsQuery("");

  // Handle loading state
  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  // Handle error state
  if (error) {
    return <p className="text-red-500">Failed to load posts. Please try again later.</p>;
  }

  const posts = postsData?.data || [];
  const meta = postsData?.meta || { page: 1, total: 0, pageSize: 10 };

  console.log(posts);
  console.log(meta);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <PostCard
            key={post?.id}
            channelname={post?.channelName || "Unknown Channel"}
            title={post?.title || "Untitled Post"}
            content={post?.content || "No content available"}
            userimage={post?.doctor?.user?.profile?.avatar || "/default-avatar.svg"}
            likes={post?.likesCount || 0}
            comments={post?.commentsCount || 0}
            postid={post?.id}
            likedUser={post?.likedUser ? "true" : "false"}
            userid={post?.doctor.user.id || "Unknown User"}
            likeid={post?.likeId || null}
            first_name={post?.doctor?.user?.first_name || "First Name"}
            last_name={post?.doctor?.user?.last_name || "Last Name"}
            specialization={post?.doctor?.specialization.name || "Specialization not provided"}
            userId={post?.doctor.user.id}
          />
        ))
      ) : (
        <p>No posts available.</p>
      )}

      <InfiniteScrollObserver
        action="POSTS"
        loading="POST"
        paginate={meta.page + 1}
        children={undefined} identifier={""} />
    </>
  );
};
