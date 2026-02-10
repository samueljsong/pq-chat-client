import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import logo from "@/assets/logo.png"

import { useAuth } from "@/context/AuthorizationContext.tsx"

export function AppSidebar() {

    const { state } = useSidebar()
    const collapsed = state === "collapsed"
    const { logout } = useAuth();

    const onLogoutClickHandler = () => {
        logout();
    }
    
    return (
        <Sidebar collapsible="icon" className="w-64 data-[collapsed=true]:w-16">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    className={[
                                        "w-full h-12",
                                        collapsed ? "justify-center px-0" : "justify-start"
                                    ].join(" ")}
                                    >
                                    <div
                                        className={[
                                        "flex items-center h-12",
                                        collapsed ? "justify-center" : "gap-2"
                                        ].join(" ")}
                                    >
                                        <img className="size-8 shrink-0" src={logo} alt="Logo" />

                                        {!collapsed && (
                                        <div className="flex flex-col leading-none">
                                            <p className=" font-medium">Securecado</p>
                                        </div>
                                    )}
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                                <DropdownMenuItem>
                                <span>Acme Inc</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup />
                    <SidebarGroup />
                </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={onLogoutClickHandler}>
                        Logout
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
        </SidebarFooter>
        </Sidebar>
    )
}