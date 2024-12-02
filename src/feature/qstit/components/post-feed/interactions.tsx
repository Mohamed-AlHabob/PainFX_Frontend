import { Like, Unlike } from "@/components/icons";
import { cn } from "@/lib/utils";
import {
  useGetLikesQuery,
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/redux/features-slices/booking/LikeApiSlice";
import { useGetCommentsQuery } from "@/redux/features-slices/booking/CommentApiSlice"; // Import comments query
import { MessageCircle } from "lucide-react";
import { useState } from "react";

type InteractionsProps = {
  id: string; // Post ID
  userid: number; // Current user's ID
  page?: boolean; // Determines layout style
};

export const Interactions = ({ id, userid, page }: InteractionsProps) => {
  const { data: likesData, isLoading: likesLoading, error: likesError } = useGetLikesQuery(id);
  const { data: commentsData, isLoading: commentsLoading, error: commentsError } = useGetCommentsQuery(id); // Fetch comments data

  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const [optimisticLiked, setOptimisticLiked] = useState<boolean | null>(null);

  const isLiked =
    optimisticLiked ?? (Array.isArray(likesData) && likesData.some((like) => like.user === userid));
  const Icon = isLiked ? Unlike : Like;

  const totalLikes = likesLoading
    ? "..."
    : optimisticLiked !== null
    ? (likesData?.length ?? 0) + (optimisticLiked ? 1 : -1)
    : likesData?.length ?? 0;

  const totalComments = commentsLoading ? "..." : commentsData?.count ?? 0; // Calculate total comments

  const handleLikeToggle = async () => {
    try {
      if (isLiked && Array.isArray(likesData)) {
        const like = likesData.find((like) => like.user === userid);
        if (like && like.id) {
          setOptimisticLiked(false); // Optimistically update UI
          await unlikePost(like.id).unwrap(); // Ensure proper error handling with `unwrap`
        } else {
          console.error("Like ID not found for this user and post");
        }
      } else {
        setOptimisticLiked(true); // Optimistically update UI
        await likePost({ post: id, user: userid }).unwrap(); // Ensure proper error handling with `unwrap`
      }
    } catch (error: any) {
      console.error("Error while toggling like:", error);
  
      // Handle 404 "No Like matches the given query" specifically
      if (error?.status === 404 && error?.data?.detail === "No Like matches the given query.") {
        console.warn("Like not found on the server. Possible desynchronization.");
        setOptimisticLiked(false); // Revert optimistic update
      } else {
        setOptimisticLiked((prev) => !prev); // Revert optimistic state on general error
      }
    }
  };
  

  if (likesError) {
    console.error("Error fetching likes:", likesError);
  }

  if (commentsError) {
    console.error("Error fetching comments:", commentsError);
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between py-2",
        page ? "" : "px-6"
      )}
    >
      <div className="flex gap-5 text-[#757272] text-sm">
        {/* Likes Section */}
        <span className="flex gap-1 justify-center items-center">
          <span
            className={`cursor-pointer ${likesLoading ? "opacity-50" : ""}`}
            onClick={likesLoading ? undefined : handleLikeToggle} // Disable interaction if loading
          >
            <Icon />
          </span>
          {totalLikes}
        </span>

        {/* Comments Section */}
        <span className="flex gap-1 justify-center items-center">
          <MessageCircle size={16} />
          {totalComments}
        </span>
      </div>
    </div>
  );
};
