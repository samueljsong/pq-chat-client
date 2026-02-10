import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

export const HoverButton = ({icon, iconText, function: onClick}: {icon: any, iconText: string, function: any}) => {

    return(
        <HoverCard openDelay={0} closeDelay={0} >
            <HoverCardTrigger className="cursor-pointer" onClick={onClick}>
                <div className=" h-7 w-7 flex items-center justify-center rounded-md hover:bg-[#EFF2F9]">
                    {icon}
                </div>
            </HoverCardTrigger>
            <HoverCardContent side="right" 
                className=" 
                    w-auto px-2 py-1 flex items-center 
                    justify-center text-foreground-muted 
                    text-xs font-light ml-2
                    "
                >
                {iconText}
            </HoverCardContent>
        </HoverCard>
    )
}