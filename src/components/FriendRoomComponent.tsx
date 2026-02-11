import { Input } from "@/components/ui/input";

// React
import { useEffect, useState } from "react";

// Assets
import placeholder from '../assets/placeholder.svg'

// Import Components
import { Search } from "lucide-react";
import { UserCardComponent } from "./UserCardComponent";

export const FriendRoomComponent = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!search) {
            setUsers([]);
            return;
        }

        const controller = new AbortController();

        const timeout = setTimeout(async () => {
            try {
            const res = await fetch(
                `http://localhost:5172/api/user/search?username=${search}`,
                { signal: controller.signal }
            );

            if (!res.ok) throw new Error("Search failed");

            const data = await res.json();
            console.log(data);
            setUsers(data);
            } catch (err: any) {
            if (err.name !== "AbortError") {
                console.error(err);
            }
            }
        }, 300); // debounce delay

        return () => {
            clearTimeout(timeout);
            controller.abort();
        };
    }, [search]);

    return(
        <div className="h-full w-full flex flex-col">
            <div className="h-10 mb-4">
                <div className="relative w-full h-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className=" h-full pl-9"
                        placeholder="Search Usernames..."
                    />
                </div>
            </div> 
            {
                (users.length === 0) 
                    ?   <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-2 items-center justify-center">
                            <img src={placeholder} alt="" className=" w-64 h-64"/>
                        </div>
                    :   
                        <div className=" flex gap-4 w-full flex-wrap">
                            {users.map((user: any) => (
                                <UserCardComponent key={user.userId} username={user.username} firstName={user.firstName} lastName={user.lastName} />
                            ))}
                        </div>
            }
        </div>
    )
}