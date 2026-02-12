import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "../ui/button"

import userImg from '../../assets/05.png'

export const FriendCard = ({friendUserId, friendshipId, friendFirstName, friendLastName, friendUserName} : any) => {
    return(
        <div className="flex gap-4 w-full h-16  px-4 items-center border rounded-md">
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
                    <Button className="cursor-pointer">Remove</Button>
                </div>
            </div>
        </div>
    )
}