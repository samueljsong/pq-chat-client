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

export const ChatListComponent = () => {

    return(
        <Card className=" bg-white h-full w-110 min-w-90 rounded-xl pb-0 flex-col">
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
                    <ChatCardComponent/>
                    <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                          <Separator/>
                    <ChatCardComponent/>
                </div>
            </ScrollArea>
        </Card>
    )
}