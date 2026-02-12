import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

import { Users } from "lucide-react"

export function EmptyFriendListComponent() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                <Users />
                </EmptyMedia>
                <EmptyTitle>No Friends Yet</EmptyTitle>
                <EmptyDescription>
                You haven&apos;t added any friends yet. Get started by adding
                your first friend.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
