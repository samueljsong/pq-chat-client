import { FriendListComponent } from "@/components/FriendListComponent"
import { FriendRoomComponent } from "@/components/FriendRoomComponent"

export const FriendsView = () => {
    return (
        <div className="flex h-[calc(100dvh-64px)] w-full gap-4 p-4">
            <FriendListComponent />
            <FriendRoomComponent />
        </div>
    )
}