"use client"


import InfiniteScrollObserver from "@/components/global/infinite-scroll"
import { PaginatedPosts } from "../paginates-posts"
import { PostCard } from "./post-card"

type PostFeedProps = {
  channelid: string
  userid: string
}

export const PostFeed = ({ channelid, userid }: PostFeedProps) => {
  // const { posts } = data as {
  //   posts: ({
  //     likes: {
  //       id: string
  //       userId: string
  //     }[]
  //     channel: {
  //       name: string
  //     }
  //     _count: {
  //       likes: number
  //       comments: number
  //     }
  //     author: {
  //       firstname: string
  //       lastname: string
  //       image: string | null
  //     }
  //   } & {
  //     id: string
  //     createdAt: Date
  //     title: string | null
  //     htmlContent: string | null
  //     jsonContent: string | null
  //     content: string
  //     authorId: string
  //     channelId: string
  //   })[]
  // }
  return  (
    <>
      {/* {posts.map((post) => ( */}
        <PostCard
          key={"post.id"}
          channelname={"post.channel.name!"}
          title={"post.title!"}
          html={"post.htmlContent!"}
          username={"post.author.firstname + post.author.lastname"}
          userimage={"./file.svg"}
          likes={2}
          comments={3}
          postid={"post.id"}
          likedUser={"12"}
          userid={userid}
          likeid={"12"}
        />
      {/* ))} */}
      <InfiniteScrollObserver
        action="POSTS"
        loading="POST"
        identifier={channelid}
        paginate={2}
      >
        <PaginatedPosts userid={userid} />
      </InfiniteScrollObserver>
    </>
  ) 
}
