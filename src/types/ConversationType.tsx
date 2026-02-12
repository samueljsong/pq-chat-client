export type ConversationListItem = {
  conversationId: string;
  conversationType: "DM" | "GROUP";
  otherUserId: string | null;
  otherUsername: string | null;
  otherFirstName: string | null;
  otherLastName: string | null;
  title: string | null;
  avatarUrl: string | null;
  lastMessagePreview: string | null;
  lastMessageAt: string | null;
};
