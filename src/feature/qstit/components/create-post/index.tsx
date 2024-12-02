"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription } from "@/components/ui/card"

import { PostCard } from "../post-feed/post-card"
import { SimpleModal } from "@/components/global/simple-modal"
import { PostContent } from "@/components/global/post-content"
import { useRetrieveUserQuery } from "@/redux/features-slices/auth/authApiSlice"

const CreateNewPost = () => {
  const { data: user, isLoading } = useRetrieveUserQuery();
  return (
    <>
      <SimpleModal
        trigger={
          <span>
            <Card className="border-themeGray cursor-pointer first-letter:rounded-2xl overflow-hidden">
              <CardContent className="p-3 bg-[#1A1A1D] flex gap-x-6 items-center ">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <CardDescription className="text-themeTextGray">
                  Type / to add elements to your post...
                </CardDescription>
              </CardContent>
            </Card>
          </span>
        }
      >
        <div className="flex gap-x-3">
          <Avatar className="cursor-pointer">
            <AvatarImage src={user?.avatar} alt="user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-themeTextGray text-sm capitalize">{user?.first_name || "name"}</p>
            <p className="text-sm captialize text-themeTextGray">
              Posting in{" "}
              <span className="font-bold capitalize text-themeTextWhite">
                {"name"}
              </span>
            </p>
          </div>
        </div>
        <PostContent />
      </SimpleModal>
          {/* <PostCard userId={""} content={""} channelname={""} title={""} likes={0} comments={0} postid={""}/> */}
    </>
  )
}

export default CreateNewPost
