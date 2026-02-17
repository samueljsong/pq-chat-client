import { setSharedKey, getSharedKey } from "./keystore";

// 1. LWE KEY EXCHANGE STUB FUNCTION
export function startKeyExchange(conversationId: string) {
    console.log("[CRYPTO] LWE KEY EXCHANGE START", conversationId);

    // fake shared secret
    const fakeSharedSecret = crypto.randomUUID();

    setSharedKey(conversationId, fakeSharedSecret);

    console.log("[CRYPTO] LWE KEY EXCHANGE COMPLETE", fakeSharedSecret);
}

// 2. ENCRYPT STUB
export function encryptMessage(
    plaintext: string,
    conversationId: string
): string {

    const key = getSharedKey(conversationId);

    if (!key) {
        console.warn("[CRYPTO] no shared key — auto starting exchange");
        startKeyExchange(conversationId);
    }

    console.log("[CRYPTO] ENCRYPT", plaintext);

    // fake encryption → base64
    return btoa(plaintext);
}

// 3. DECRYPT STUB
export function decryptMessage(
    ciphertext: string,
    conversationId: string
): string {

    const key = getSharedKey(conversationId);

    if (!key) {
        console.error("[CRYPTO] missing shared key");
        return "[DECRYPT ERROR]";
    }

    console.log("[CRYPTO] DECRYPT", ciphertext);

    return atob(ciphertext);
}
