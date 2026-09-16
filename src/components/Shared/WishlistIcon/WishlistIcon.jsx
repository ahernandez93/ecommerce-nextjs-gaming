import { Heart } from "lucide-react";

import { cn } from "@/lib";

export function WishlistIcon({ className, active = true }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "inline-flex items-center justify-center text-primary",
                className,
            )}
        >
            <Heart className={cn("size-5", active && "fill-current")} />
        </span>
    );
}
