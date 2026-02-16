// useRealtime.ts
import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/context/AuthorizationContext";

type IncomingMsg =
  | { type: "MESSAGE"; conversationId: string; fromUserId: string; ciphertext?: string }
  | { type: string; [k: string]: any };

type Listener = (msg: IncomingMsg) => void;

export function useRealtime() {
  const { token } = useAuth();

  const wsRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef(new Set<Listener>());
  const pendingJoinsRef = useRef<string[]>([]);

  useEffect(() => {
    if (!token) return;

    if (wsRef.current && wsRef.current.readyState !== WebSocket.CLOSED) {
        return;
    }

    const ws = new WebSocket(`wss://localhost:7011/ws?token=${token}`);
    ws.binaryType = "arraybuffer"; // IMPORTANT
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "AUTH", token }));

      // flush queued joins (if user clicked before open)
      for (const cid of pendingJoinsRef.current) {
        ws.send(JSON.stringify({ type: "JOIN_CONVERSATION", conversationId: cid }));
      }
      pendingJoinsRef.current = [];
    };

    ws.onmessage = async (e) => {
      try {
        let text: string;

        if (typeof e.data === "string") {
          text = e.data;
        } else if (e.data instanceof ArrayBuffer) {
          text = new TextDecoder().decode(new Uint8Array(e.data));
        } else {
          // Blob
          text = await e.data.text();
        }

        const msg: IncomingMsg = JSON.parse(text);
        listenersRef.current.forEach((fn) => fn(msg));
      } catch (err) {
        console.error("WS message parse failed", err, e.data);
      }
    };

    ws.onclose = () => {
      wsRef.current = null;
    };

    return () => {
      try { ws.close(); } catch {}
    };
  }, [token]);

  const onMessage = useCallback((fn: Listener) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  }, []);

  const joinConversation = useCallback((conversationId: string) => {
    const ws = wsRef.current;
    const msg = JSON.stringify({ type: "JOIN_CONVERSATION", conversationId });

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      pendingJoinsRef.current.push(conversationId);
      return;
    }
    ws.send(msg);
  }, []);

  const sendMessage = useCallback((conversationId: string, ciphertext: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    ws.send(JSON.stringify({ type: "SEND_MESSAGE", conversationId, ciphertext }));
  }, []);

  return { joinConversation, sendMessage, onMessage };
}
