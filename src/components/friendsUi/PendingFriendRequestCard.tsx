import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "../ui/button"

import userImg from '../../assets/05.png'

export const PendingFriendRequestCard = ({friendUserId, friendFirstName, friendLastName, friendUserName} : any) => {
    return(
        <div className="flex gap-4 w-full h-16  px-6 items-center cursor-pointer]">
            <div className=" relative">
                <Avatar className=" w-10 h-10 overflow-visible">
                    <AvatarImage src={userImg}/>
                    <AvatarBadge className="bg-green-400" />
                </Avatar>
            </div>
            <div className=" flex w-full items-center justify-center">
                <div className="flex w-full flex-col">
                    <p className="text-xs font-medium">{friendFirstName} {friendLastName}</p>
                    <p className="text-xs text-muted-foreground">{friendUserName}</p>
                </div>
                <div>
                    <Button className="cursor-pointer">Cancel</Button>
                </div>
            </div>
        </div>
    )
}