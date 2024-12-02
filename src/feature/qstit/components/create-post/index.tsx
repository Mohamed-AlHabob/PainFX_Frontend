"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription } from "@/components/ui/card"

import { PostCard } from "../post-feed/post-card"
import { SimpleModal } from "@/components/global/simple-modal"
import { PostContent } from "@/components/global/post-content"
import { useRetrieveUserQuery } from "@/redux/features-slices/auth/authApiSlice"
// import ReelCarousel from "../reel-feed"

const CreateNewPost = () => {
  const { data: user, isLoading } = useRetrieveUserQuery();
  return (
    <>
      <SimpleModal
        trigger={
          <span>
            <Card className="dark:border-themeGray cursor-pointer first-letter:rounded-2xl overflow-hidden">
              <CardContent className="p-3 dark:bg-[#1A1A1D] flex gap-x-6 items-center ">
                <Avatar className="cursor-pointer">
                  <AvatarImage src="" alt="user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <CardDescription className="">
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
            <p className=" text-sm capitalize">{user?.first_name || "name"}</p>
            <p className="text-sm captialize ">
              Posting in{" "}
              <span className="font-bold capitalize ">
                {"name"}
              </span>
            </p>
          </div>
        </div>
        <PostContent />
      </SimpleModal>
          {/* <ReelCarousel /> */}
    </>
  )
}

export default CreateNewPost
