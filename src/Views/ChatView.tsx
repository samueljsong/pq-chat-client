import { ChatListComponent } from "@/components/ChatListComponent";
import { ChatRoomComponent } from "@/components/ChatRoomComponent";

export const ChatView = () => {
    return (
        <div className="flex h-[calc(100dvh-64px)] w-full gap-4 p-4">
            <ChatListComponent />
            <ChatRoomComponent />
        </div>
    );
}