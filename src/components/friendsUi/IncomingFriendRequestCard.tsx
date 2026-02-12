import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { toast } from "sonner";

import { CheckCheck, X } from "lucide-react"

import userImg from '../../assets/05.png'

export const IncomingFriendRequestCard = ({friendUserId, friendshipId, friendFirstName, friendLastName, friendUserName} : any) => {

    const onDeclineFriendRequestClickHandler = () => {
        console.log("denied")
    }

    const onAcceptFriendRequestClickHandler = async (friendshipId: string) => {

        const token = localStorage.getItem("token");

        const res = await fetch(
            `http://localhost:5172/api/friendship/accept/${friendshipId}`,
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!res.ok)
            throw new Error("Failed to accept friend request");

        window.location.reload();
    };



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
                <div className=" flex gap-1">
                    <HoverCard openDelay={0} closeDelay={0}>
                        <HoverCardTrigger asChild onClick={() =>
                            toast.promise(
                                onAcceptFriendRequestClickHandler(friendshipId),
                                {
                                    loading: "Accepting...",
                                    success: "Friend added!",
                                    error: "Failed to accept"
                                }
                            )
                        }>
                            <div className=" w-8 h-8 flex items-center justify-center rounded-md cursor-pointer hover:bg-[#EFF2F9]">
                                <CheckCheck className="text-green-400" />
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="flex w-auto p-2 border-green-400">
                            <div className="font-light text-xs text-green-400">Accept Request</div>
                        </HoverCardContent>
                    </HoverCard>
                    <HoverCard openDelay={0} closeDelay={0}>
                        <HoverCardTrigger asChild onClick={onDeclineFriendRequestClickHandler}>
                            <div className=" w-8 h-8 flex items-center justify-center rounded-md cursor-pointer hover:bg-[#EFF2F9]">
                                <X className="text-red-400" />
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="flex w-auto p-2 border-red-400">
                            <div className="font-light text-xs text-red-400">Decline Request</div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        </div>
    )
}