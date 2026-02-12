import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar"

import userImg from '../assets/01.png'

export const ChatCardComponent = ({conversationId, otherFirstName, otherLastName, otherUserName, lastMessagePreview, lastMessageAt} : any) => {

    return(
        <div className="flex gap-4 w-full h-16  px-6 items-center cursor-pointer hover:bg-[#EFF2F9]">
            <div className=" relative">
                <Avatar className=" w-10 h-10 overflow-visible">
                    <AvatarImage src={userImg}/>
                    <AvatarBadge className="bg-green-400" />
                </Avatar>
            </div>
            <div className=" flex w-full flex-col align-middle justify-center">
                <div className="flex w-full justify-between">
                    <p className="text-xs font-medium">{otherFirstName} {otherLastName} @{otherUserName}</p>
                    <p className="text-xs font-light">{lastMessageAt ? lastMessageAt : "..."}</p>
                </div>
                <div>
                    <p className="text-xs text-muted-foreground">{lastMessagePreview ? lastMessagePreview : "..."}</p>
                </div>
            </div>
        </div>
    )
}