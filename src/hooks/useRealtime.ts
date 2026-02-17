import { useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/AuthorizationContext";
import { encryptMessage } from "@/crypto/crypto";

type IncomingMsg =
  | { type: "MESSAGE"; conversationId: string; fromUserId: string; ciphertext?: string }
  | { type: string; [k: string]: any };

type Listener = (msg: IncomingMsg) => void;

const SIO_URL = "http://localhost:3001";

export function useRealtime() {
  const { token } = useAuth();

  const socketRef = useRef<Socket | null>(null);
  const listenersRef = useRef(new Set<Listener>());
  const pendingJoinsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!token) return;

    // prevent duplicates
    if (socketRef.current?.connected || socketRef.current?.active) return;

    const socket = io(SIO_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("SIO connected");

      for (const cid of pendingJoinsRef.current) {
        socket.emit("join_conversation", { conversationId: cid });
      }
      pendingJoinsRef.current = [];
    });

    socket.on("server_msg", (raw: any) => {
    // normalize TCP PascalCase -> camelCase for the UI
        const msg = {
            type: raw.Type ?? raw.type,
            conversationId: raw.ConversationId ?? raw.conversationId,
            fromUserId: raw.FromUserId ?? raw.fromUserId,
            ciphertext: raw.Ciphertext ?? raw.ciphertext,
            userId: raw.UserId ?? raw.userId,
        };

        listenersRef.current.forEach((fn) => fn(msg as any));
    });


    socket.on("connect_error", (err) => {
      console.error("SIO connect_error:", err?.message ?? err);
    });

    socket.on("disconnect", (reason) => {
      console.log("SIO disconnected:", reason);
      socketRef.current = null;
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  const onMessage = useCallback((fn: Listener) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  }, []);

  const joinConversation = useCallback((conversationId: string) => {
    const s = socketRef.current;

    if (!s || !s.connected) {
      if (!pendingJoinsRef.current.includes(conversationId)) {
        pendingJoinsRef.current.push(conversationId);
      }
      return;
    }

    s.emit("join_conversation", { conversationId });
  }, []);

  const sendMessage = useCallback((conversationId: string, ciphertext: string) => {

    // this is just stub
    const stubCipherText = encryptMessage(ciphertext, conversationId);
    console.log("SENDING:", { conversationId, stubCipherText });

    const s = socketRef.current;
    if (!s || !s.connected) return;

    s.emit("send_message", { conversationId, ciphertext });
  }, []);

  return { joinConversation, sendMessage, onMessage };
}
