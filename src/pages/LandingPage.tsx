
import { ChatListComponent } from "@/components/ChatListComponent";
import { VerticalNavbar } from "@/components/VerticalNavbar";

export const LandingPage = () => 
{
    return(
        <>
            <div className=" flex h-screen w-full">
                <VerticalNavbar></VerticalNavbar>
                <div className="flex gap-4 w-full h-full items-center p-4 flex-1">
                        <ChatListComponent></ChatListComponent>
                    <div className=" bg-white h-full w-full rounded-xl"></div>
                </div>
            </div>
        </>
    )
}