import userImg from '../assets/02.png'

import { Outlet } from "react-router-dom";

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"

import { Moon, Bell, Settings } from 'lucide-react';
import { VerticalNavbar } from "@/components/VerticalNavbar";

export const LandingPage = () => 
{
    return(
        <>
            <div className=" flex h-screen w-full">
                <VerticalNavbar></VerticalNavbar>
                <div className=" flex flex-col w-full h-full gap-2">
                    <span className="h-1"></span>
                    <div className="flex flex-col gap w-full min-h-0 items-center border rounded-t-xl bg-[#fbfbfb]">
                        <div className=" h-12 w-full flex items-center justify-between px-6 rounded-t-xl border-b bg-white">
                            <p>Securecado</p>
                            <div className=' flex gap-2 items-center'>
                                <div className=" h-7 w-7 flex items-center justify-center rounded-md hover:bg-[#EFF2F9] cursor-pointer">
                                    <Bell className="w-4 h-4 text-gray-500"/>
                                </div>
                                <div className=" h-7 w-7 flex items-center justify-center rounded-md hover:bg-[#EFF2F9] cursor-pointer">
                                    <Moon className="w-4 h-4 text-gray-500"/>
                                </div>
                                <div className=" h-7 w-7 flex items-center justify-center rounded-md hover:bg-[#EFF2F9] cursor-pointer">
                                    <Settings className="w-4 h-4 text-gray-500"/>
                                </div>
                                <span className=' h-5 w-px bg-[#dadce1]' />
                                <div className=" relative">
                                    <Avatar className=" w-7 h-7 overflow-visible">
                                        <AvatarImage src={userImg}/>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}