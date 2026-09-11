import { cn } from "@/lib/utils";

export function Discount({ children, className }) {
    return (
        <span
            className={cn(
                "absolute left-0 z-[2]",
                "rounded-[8px_8px_0]",
                "bg-primary",
                "px-1 pb-[1px] pt-[3px]",
                "text-[13px] font-bold leading-normal text-primary-foreground",
                "after:absolute after:bottom-0 after:top-0",
                "after:-right-1 after:z-[-1]",
                "after:w-full after:skew-x-[16deg]",
                "after:rounded-[10px_5px]",
                "after:bg-primary",
                "after:content-['']",
                className,
            )}
        >
            {children}
        </span>
    );
}