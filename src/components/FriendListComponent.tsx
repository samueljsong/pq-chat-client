type FriendshipListItem = {
    friendshipId   : string;
    direction      : string;
    status         : string;
    createdAt      : string;
    otherUserId    : string;
    otherUsername  : string;
    otherFirstName : string;
    otherLastName  : string;
};

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input                       } from "@/components/ui/input";
import { Search                      } from "lucide-react";
import { ScrollArea                  } from "@/components/ui/scroll-area"
import { EmptyFriendListComponent    } from "./EmptyFriendListComponent";
import { NonEmptyFriendListComponent } from "./NonEmptyFriendListComponent";

import { useEffect, useState } from "react";

export const FriendListComponent = () => {
    const [ incomingFriendRequests , setIncomingFriendRequests ] = useState<FriendshipListItem[]>([]);
    const [ pendingFriendRequests  , setPendingFriendRequests  ] = useState<FriendshipListItem[]>([]);
    const [ friends                , setFriends                ] = useState<FriendshipListItem[]>([]);

    const getIncomingFriendRequests = async () => {
        const result = await fetch("http://localhost:5172/api/friendship/getIncomingRequest", {
            headers: getAuthHeaders(),
        });

        if (!result.ok) throw new Error("Failed to fetch incoming requests");
        return await result.json();
    }

    const getFriends = async () => {
        const result = await fetch("http://localhost:5172/api/friendship/getAllFriends", {
            headers: getAuthHeaders(),
        });

        if (!result.ok) throw new Error("Failed to fetch friends");
        return await result.json();
    }

    const getPendingFriendRequests = async () => {
        const result = await fetch("http://localhost:5172/api/friendship/getPendingRequests", {
            headers: getAuthHeaders(),
        });

        if (!result.ok) throw new Error("Failed to fetch pending requests");
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

                const [incoming, pending, friendsList] = await Promise.all([
                    getIncomingFriendRequests(),
                    getPendingFriendRequests(),
                    getFriends()
                ]);

                setIncomingFriendRequests(incoming);
                setPendingFriendRequests(pending);
                setFriends(friendsList);

            } catch (err) {
                console.error(err);
            }
        };

        loadFriendsData();

    }, []);



    return(
        <Card className=" bg-white h-full w-110 min-w-90 rounded-xl pb-0 flex flex-col">
            <CardHeader>
                <CardTitle className=" text-2xl font-medium mb-2">Friends</CardTitle>
                <CardDescription className=" col-span-2">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            className="pl-9"
                            placeholder="Search Friends"
                        />
                    </div>
                </CardDescription>
            </CardHeader>
            <ScrollArea className=" flex-1 min-h-0 w-full rounded-b-xl">
                <div className=" flex flex-col">
                    {
                        (incomingFriendRequests.length === 0 && pendingFriendRequests.length === 0 && friends.length === 0) 
                            ? <EmptyFriendListComponent/>
                            : <NonEmptyFriendListComponent incomingFriendRequests={incomingFriendRequests} pendingFriendRequests={pendingFriendRequests} friends={friends}/>
                    }
                </div>
            </ScrollArea>
        </Card>
    )
}