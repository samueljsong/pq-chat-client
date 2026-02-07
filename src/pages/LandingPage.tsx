import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const LandingPage = () => 
{

    return(
        <SidebarProvider>
            <AppSidebar />
                <main>
                    <SidebarTrigger />
                </main>
        </SidebarProvider>
    )
}