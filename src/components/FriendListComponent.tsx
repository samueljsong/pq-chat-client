import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { EmptyFriendListComponent } from "./EmptyFriendListComponent";


import { useEffect, useState } from "react";

export const FriendListComponent = () => {
    
    useEffect(() => {

    }, [])

    const [chatList, setChatList] = useState([]);

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
                    <EmptyFriendListComponent/>
                </div>
            </ScrollArea>
        </Card>
    )
}