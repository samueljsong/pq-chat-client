import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { PlusIcon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"

import { ChatCardComponent } from "@/components/ChatCardComponent";
import { EmptyChatListComponent } from "./EmptyChatListComponent";

import type { ConversationListItem } from "@/types/ConversationType";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthorizationContext";

export const ChatListComponent = () => {

    const { token } = useAuth();
    const [chatList, setChatList] = useState<ConversationListItem[]>([]);

    const getAllConversations = async (): Promise<ConversationListItem[]> => {
        if (!token) throw new Error("Not authenticated");

        const res = await fetch("http://localhost:5172/api/conversation/getAll", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        if (!res.ok) throw new Error(await res.text());
        return await res.json();
    };
    
    useEffect(() => {
        if (!token) return;

        const load = async () => {
        try {
            const data = await getAllConversations();
            setChatList(data);
        } catch (err) {
            console.error(err);
            setChatList([]);
        }
        };

        load();
    }, [token])


    return(
        <Card className=" bg-white h-full w-110 min-w-90 rounded-xl pb-0 flex flex-col">
            <CardHeader>
                <CardTitle className=" text-2xl font-medium">Chats</CardTitle>
                <CardAction>
                    <Button className=" h-8 w-8 rounded-full border border-[#B5BFC6] flex items-center justify-center cursor-pointer bg-transparent">
                        <PlusIcon className="w-4 h-4 text-[#B5BFC6]"/>
                    </Button>
                </CardAction>
                <CardDescription className=" col-span-2">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            className="pl-9"
                            placeholder="Search Chats"
                        />
                    </div>
                </CardDescription>
            </CardHeader>
            <ScrollArea className=" flex-1 min-h-0 w-full rounded-b-xl">
                <div className=" flex flex-col">
                    {
                        (chatList.length === 0) 
                            ? <EmptyChatListComponent />
                            : chatList.map((chat) => {
                                return <>
                                    <ChatCardComponent 
                                        key                = { chat.conversationId     } 
                                        conversationId     = { chat.conversationId     } 
                                        otherFirstName     = { chat.otherFirstName     } 
                                        otherLastName      = { chat.otherLastName      } 
                                        otherUserName      = { chat.otherUsername      } 
                                        lastMessagePreview = { chat.lastMessagePreview } 
                                        lastMessageAt      = { chat.lastMessageAt      }
                                    />
                                    <Separator/>
                                </>
                            })
                    }
                </div>
            </ScrollArea>
        </Card>
    )
}