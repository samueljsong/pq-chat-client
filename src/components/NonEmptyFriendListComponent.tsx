import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { ChevronsUpDown } from "lucide-react"

import { useState } from "react";

import { PendingFriendRequestCard } from "./friendsUi/PendingFriendRequestCard";
import { IncomingFriendRequestCard } from "./friendsUi/IncomingFriendRequestCard";
import { FriendCard } from "./friendsUi/FriendCard";

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

type NonEmptyFriendListProps = {
    incomingFriendRequests: FriendshipListItem[];
    pendingFriendRequests: FriendshipListItem[];
    friends: FriendshipListItem[];
};
export const NonEmptyFriendListComponent = ({incomingFriendRequests, pendingFriendRequests, friends} : NonEmptyFriendListProps) => {

    const [ isIncomingFriendsListOpen , setIsIncomingFriendsListOpen ] = useState(true);
    const [ isFriendsListOpen         , setIsFriendsListOpen         ] = useState(true);
    const [ isPendingFriendsListOpen  , setIsPendingFriendsListOpen  ] = useState(true);

    return(
        <>
            <Collapsible
                open={isIncomingFriendsListOpen}
                onOpenChange={setIsIncomingFriendsListOpen}
            >
                <div className="flex items-center justify-between gap-4 px-4">
                    <h4 className="text-sm font-light">Incoming Friend Requests</h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                            <ChevronsUpDown />
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="flex flex-col gap-2 p-2">
                    {
                        incomingFriendRequests.map((friend) => {
                            return (
                                <IncomingFriendRequestCard 
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
                </CollapsibleContent>
            </Collapsible>
            <Collapsible
                open={isPendingFriendsListOpen}
                onOpenChange={setIsPendingFriendsListOpen}
            >
                <div className="flex items-center justify-between gap-4 px-4">
                    <h4 className="text-sm font-light">Pending Friend Requests</h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                            <ChevronsUpDown />
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="flex flex-col gap-2 p-2">
                    {
                        pendingFriendRequests.map((friend) => {
                            return (
                                <PendingFriendRequestCard 
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
                </CollapsibleContent>
            </Collapsible>
            <Collapsible
                open={isFriendsListOpen}
                onOpenChange={setIsFriendsListOpen}
            >
                <div className="flex items-center justify-between gap-4 px-4">
                    <h4 className="text-sm font-light">Friends List</h4>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                            <ChevronsUpDown />
                        </Button>
                    </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="flex flex-col gap-2 p-2">
                    {
                        friends.map((friend) => {
                            return (
                                <FriendCard 
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
                </CollapsibleContent>
            </Collapsible>
        </>
    )
}