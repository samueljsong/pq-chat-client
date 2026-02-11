type UserCardComponentType = {
  username: string
  firstName: string
  lastName: string
}

import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

import avatarIcon from "../assets/03.png"
import { Avatar, AvatarImage } from "./ui/avatar"

export const UserCardComponent = ({ username, firstName, lastName }: UserCardComponentType) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button type="button" className="flex w-[calc(33.333%-1rem)]">
                <div className="flex w-full bg-white border items-center gap-2 p-2 hover:bg-muted rounded-md cursor-pointer">
                    <Avatar className="h-8 w-8">
                    <AvatarImage src={avatarIcon} />
                    </Avatar>

                    <div className="flex justify-between w-full items-center">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">
                        {firstName} {lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">{username}</span>
                    </div>

                    <div className="border rounded-md">
                        <p className="text-xs p-2 text-muted-foreground">Add Friend</p>
                    </div>
                    </div>
                </div>
                </button>
            </DialogTrigger>

            <DialogContent showCloseButton={false}>
                <DialogHeader>
                <DialogTitle>Send Friend Request?</DialogTitle>
                <DialogDescription>
                    Would you like to send a friend request to {firstName} {lastName} (@{username})?
                </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                <DialogClose asChild>
                    <Button className="cursor-pointer" type="button" variant="outline">
                    Cancel
                    </Button>
                </DialogClose>

                <Button className="cursor-pointer" type="button" onClick={() => {/* send request */}}>
                    Send request
                </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
