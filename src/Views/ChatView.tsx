import { ChatListComponent } from "@/components/ChatListComponent";
import { ChatRoomComponent } from "@/components/ChatRoomComponent";
import type { ConversationListItem } from "@/types/ConversationType";
import { useEffect, useMemo, useState } from "react";
import { useRealtime } from "@/hooks/useRealtime";

export const ChatView = () => {

    const [ selectedChat, setSelectedChat ] = useState<ConversationListItem | null>(null); 

    return (
        <div className="flex h-[calc(100dvh-64px)] w-full gap-4 p-4">
            <ChatListComponent onSelectChat={setSelectedChat}/>
            <ChatRoomComponent selectedChat={selectedChat}/>
        </div>
    );
}