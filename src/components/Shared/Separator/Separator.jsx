import { cn } from "@/lib/utils";

export function Separator({ height = 50, className }) {
    return (
        <div
            aria-hidden="true"
            className={cn("w-full shrink-0", className)}
            style={{ height }}
        />
    );
}
