// in-memory shared secret store
// later replace with secure storage

const sharedKeys = new Map<string, string>();

export function setSharedKey(conversationId: string, key: string) {
    console.log("[CRYPTO] store shared key for", conversationId);
    sharedKeys.set(conversationId, key);
}

export function getSharedKey(conversationId: string) {
    return sharedKeys.get(conversationId);
}
