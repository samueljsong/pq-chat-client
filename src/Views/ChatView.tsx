import { ChatListComponent } from "@/components/ChatListComponent";
import { ChatRoomComponent } from "@/components/ChatRoomComponent";

export const ChatView = () => {
    return (
        <div className="flex flex-1 min-h-0 gap-4 w-full p-4">
            <ChatListComponent />
            <ChatRoomComponent />
        </div>
    );
}