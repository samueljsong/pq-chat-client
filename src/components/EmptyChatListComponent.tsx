import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button        } from "@/components/ui/button"
import { ScrollArea    } from "@/components/ui/scroll-area"
import { Input         } from "@/components/ui/input";
import { Search        } from "lucide-react";
import { MessageSquare } from "lucide-react"

import { useState , useEffect} from "react"

import type { FriendshipListItem } from '../types/FriendshipType'

import { ConversationCard } from "./friendsUi/ConversationCard"

export function EmptyChatListComponent() {

    const [friends, setFriends] = useState<FriendshipListItem[]>([]);

    const getFriends = async () => {
        const result = await fetch("http://localhost:5172/api/friendship/getAllFriends", {
            headers: getAuthHeaders(),
        });

        if (!result.ok) throw new Error("Failed to fetch friends");
        return await result.json();
    }

    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Not authenticated");

        return {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        };
    };

    useEffect(() => {
        const loadFriendsData = async () => {
            try {

                const [friendsList] = await Promise.all([
                    getFriends()
                ]);

                setFriends(friendsList);

            } catch (err) {
                console.error(err);
            }
        };

        loadFriendsData();

    }, []);

    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                <MessageSquare />
                </EmptyMedia>
                <EmptyTitle>No Chats Yet</EmptyTitle>
                <EmptyDescription>
                You haven&apos;t started any chats yet. Get started by creating
                your first chat.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <Dialog>
                    <DialogTrigger>
                        <Button className=" cursor-pointer">Create Chat</Button>
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined}>
                        <DialogHeader>
                            <DialogTitle>Find a friend to start chatting</DialogTitle>
        
                                <div className=" w-full flex flex-col gap-2">
                                    <div className="relative w-full">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            className="pl-9"
                                            placeholder="Search Friends"
                                        />
                                    </div>
                                    <ScrollArea className="h-72 w-full rounded-md border">
                                        <div className="p-4 flex flex-col gap-2">
                                            {
                                                friends.map((friend) => {
                                                    return (
                                                        <ConversationCard 
                                                            key             = { friend.friendshipId   } 
                                                            friendshipId    = { friend.friendshipId   }
                                                            friendUserId    = { friend.otherUserId    } 
                                                            friendFirstName = { friend.otherFirstName } 
                                                            friendLastName  = { friend.otherLastName  } 
                                                            friendUserName  = { friend.otherUsername  }
                                                        />
                                                    );
                                                })
                                            }
                                        </div>
                                    </ScrollArea>
                                </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </EmptyContent>
        </Empty>
    )
}
