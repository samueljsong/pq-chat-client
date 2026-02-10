import logo from '../assets/logo.png';

import { MessageSquare, Bell, LogOut, Users } from 'lucide-react';

import { HoverButton } from './HoverButton';

import { useAuth } from '@/context/AuthorizationContext';


export const VerticalNavbar = () => {

    const { logout } = useAuth();

    const onMessageClickHandler = () => {
        // navigate to messages page
    }

    const onUserClickHandler = () => {
        // navigate to users page
    }   

    const onNotificationsClickHandler = () => {
        // navigate to notifications page
    }

    const onLogoutClickHandler = () => {
        logout();
    }

    return(
        <div className=" flex flex-col h-full w-16 items-center py-4 gap-4">
            <img className="w-10 cursor-pointer" src={logo} alt="" />
                <div className=' flex flex-col justify-between h-full'>
                    <div className=' flex flex-col gap-4'>
                        <HoverButton icon={<MessageSquare className="w-4 h-4 cursor-pointer text-gray-500"/>} iconText="Chat"          function={onMessageClickHandler}/>
                        <HoverButton icon={<Users         className="w-4 h-4 cursor-pointer text-gray-500"/>} iconText="Friends"       function={onUserClickHandler}/>
                        <HoverButton icon={<Bell          className="w-4 h-4 cursor-pointer text-gray-500"/>} iconText="Notifications" function={onNotificationsClickHandler}/>
                    </div>
                    <HoverButton icon={<LogOut        className="w-4 h-4 cursor-pointer text-red-400"/>} iconText="Logout"        function={onLogoutClickHandler}/>
                </div>  
        </div>
    )
}