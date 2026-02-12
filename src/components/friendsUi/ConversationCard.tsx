import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar"

import userImg from '../../assets/05.png'
import { Button  } from "../ui/button"
import { useAuth } from "@/context/AuthorizationContext"
import { toast   } from "sonner";

export const ConversationCard = ({friendUserId, friendshipId, friendFirstName, friendLastName, friendUserName} : any) => {

    const { token } = useAuth()

    const createConversation = async () => {

        if (!token) throw new Error("Not authenticated");

        const res = await fetch(
            `http://localhost:5172/api/conversation/dm/${friendUserId}`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) throw new Error(await res.text());

        return await res.json();
    };

    const onMessageClickHandler = async () => {
         const promise = createConversation();

        toast.promise(promise, {
        loading: "Creating conversation...",
        success: () => {
            window.location.reload();
            return "Conversation ready!";
        },
        error: (err) => err?.message || "Failed to create conversation",
        });

        await promise;
    }

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
                <Button className="cursor-pointer" onClick={onMessageClickHandler}>Message</Button>
            </div>
        </div>
    )
}