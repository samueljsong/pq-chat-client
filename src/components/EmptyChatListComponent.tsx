import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { MessageSquare } from "lucide-react"

export function EmptyChatListComponent() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                <MessageSquare />
                </EmptyMedia>
                <EmptyTitle>No Chats Yet</EmptyTitle>
                <EmptyDescription>
                You haven&apos;t started any chats yet. Get started by creating
                your first chat.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="flex-row justify-center gap-2">
                <Button className=" cursor-pointer">Create Chat</Button>
            </EmptyContent>
        </Empty>
    )
}
