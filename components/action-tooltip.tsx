"use client";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface actionToolTip {
    label: String;
    children: React.ReactNode;
    side: "top" | "right" | "bottom" | "left";
    align: "start" | "center" | "end"
}

const ActionToolTip = ({ label, children, side, align }: actionToolTip) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    <p className="font-semibold text-sm capitalize">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ActionToolTip