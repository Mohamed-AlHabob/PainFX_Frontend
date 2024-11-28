
import { HuddlesForm } from "@/components/forms/huddles"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react"

const MemberChatPage = async ({ params }: { params: { chatid: string } }) => {

  return (
      <div className="h-full flex flex-col p-5">
        <div className="bg-themeBlack rounded-2xl p-5">
          <div className="flex gap-x-2">
            <Avatar className="w-20 h-20">
              {/* <AvatarImage src={member?.member?.User?.image!} alt="User" /> */}
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-2xl capitalize">
              {/* {member?.member?.User?.firstname} {member?.member?.User?.lastname} */}
            </h3>
          </div>
        </div>
        {/* <ChatWindow userid={user.id!} recieverid={member?.member?.User?.id!} /> */}
        {/* <HuddlesForm recieverid={member?.member?.User?.id!} /> */}
      </div>
  )
}

export default MemberChatPage
