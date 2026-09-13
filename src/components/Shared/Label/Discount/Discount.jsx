import { cn } from "@/lib/utils";

export function Discount({ children, className }) {
    return (
        <span
            className={cn(
                "absolute z-[2] inline-block whitespace-nowrap",
                "rounded-tl-[8px] rounded-tr-[8px]",
                "rounded-br-[3px] rounded-bl-[8px]",
                "bg-primary",
                "px-1 pb-px pt-[3px]",
                "text-[13px] font-bold leading-[16px]",
                "text-primary-foreground",
                className,
            )}
        >
            {children}
        </span>
    );
}