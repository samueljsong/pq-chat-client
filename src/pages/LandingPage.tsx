import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ScrollArea } from "@/components/ui/scroll-area"
import { VerticalNavbar } from "@/components/VerticalNavbar";

export const LandingPage = () => 
{
    return(
        <>
            <div className=" flex h-screen w-full">
                <VerticalNavbar></VerticalNavbar>
                <div className="flex gap-4 w-full h-full items-center p-4 flex-1">
                    <Card className=" bg-white h-full w-110 min-w-90 rounded-xl pb-0 flex-col">
                        <CardHeader>
                            <CardTitle>Chats</CardTitle>
                            <CardAction>+</CardAction>
                            <CardDescription>asdfasdf</CardDescription>
                        </CardHeader>
                        <ScrollArea className=" flex-1 min-h-0 w-full rounded-b-xl">
                            <div className=" flex flex-col gap-2">

                            </div>
                        </ScrollArea>
                    </Card>
                    <div className=" bg-white h-full w-full rounded-xl"></div>
                </div>
            </div>
        </>
    )
}