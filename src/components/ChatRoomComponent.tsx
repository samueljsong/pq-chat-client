// ShadCn Imports
import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from "@/components/ui/avatar"

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";

// React
import { useState, useEffect } from "react";

// Assets
import userImg from '../assets/01.png'
import placeholder from '../assets/placeholder.svg'

// Import Components
import { MessageComponent } from "./MessageComponent";
import { useRealtime } from "@/hooks/useRealtime";
import { encryptMessage } from "@/crypto/crypto";

export const ChatRoomComponent = ({selectedChat} : any) => {

    type Message = {
        id: string;
        text: string;
        isMe: boolean;
    };

    const { sendMessage, onMessage } = useRealtime();

    const [ input, setInput ] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    // =========================
    // LISTEN FOR INCOMING MESSAGES
    // =========================
    useEffect(() : any => {
        const unsubscribe = onMessage((msg: any) => {
            if (msg.type !== "MESSAGE") return;
            if (!selectedChat) return;

            // selectedChat may be object or id depending on your state
            const selectedConversationId =
                typeof selectedChat === "string"
                    ? selectedChat
                    : selectedChat.conversationId;

            if (msg.conversationId !== selectedConversationId) return;

            setMessages(prev => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    text: msg.ciphertext ?? "",
                    isMe: false
                }
            ]);
        });

        return unsubscribe;
    }, [onMessage, selectedChat]);

    // =========================
    // SEND MESSAGE
    // =========================
    const onSend = () => {
        if (!selectedChat) return;

        const text = input.trim();
        if (!text) return;

        const conversationId =
            typeof selectedChat === "string"
                ? selectedChat
                : selectedChat.conversationId;

        const ciphertext = encryptMessage(text, selectedChat.conversationId);

        sendMessage(conversationId, text);

        // optimistic UI
        setMessages(prev => [
            ...prev,
            { id: crypto.randomUUID(), text, isMe: true }
        ]);

        setInput("");
    };

    return(
        <div className="h-full w-full flex flex-col">
            <div className="mb-4">
            {
                (selectedChat === null)
                    ?   <div></div>
                    :   <div className=" relative flex gap-2 items-center">
                            <Avatar className=" w-10 h-10 overflow-visible">
                                <AvatarImage src={userImg}/>
                                <AvatarBadge className="bg-green-400" />
                            </Avatar>
                            <div className=" flex flex-col">
                                <p className="text-xs font-medium">John Doe</p>
                                <p className="text-xs font-light text-green-400">Online</p>
                            </div>
                        </div>
            }
            </div> 
            {
                (messages.length === 0) 
                    ?   <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 items-center justify-center">
                            <img src={placeholder} alt="" className=" w-64 h-64"/>
                        </div>
                    :   <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2">
                            {messages.map((m) => (
                                <MessageComponent key={m.id} text={m.text} isMe={m.isMe} />
                            ))}
                        </div>
            }
            <div className="h-14">
                <div className="relative w-full h-full">
                        <Input
                            className=" h-full"
                            placeholder="Enter Message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={!selectedChat}
                            onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    onSend();
                            }}
                        />
                        <Button 
                            onClick={onSend}
                            disabled={!selectedChat || input.trim().length === 0}
                            className="
                                absolute right-3 top-1/2 -translate-y-1/2 
                                bg-white text-muted-foreground border 
                                border-muted-foreground h-8 w-12 text-xs 
                                rounded-md cursor-pointer
                            "
                        >
                            Send
                        </Button>
                    </div>
            </div>
        </div>
    )
}