import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "h-12 w-full min-w-0 rounded-[6px] border-2 border-border bg-surface px-3.5 text-base text-foreground outline-none transition-colors",
                "placeholder:text-muted-foreground",
                "hover:border-primary active:border-primary",
                "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20",
                "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
                "md:text-sm",
                className,
            )}
            {...props}
        />
    );
}

export { Input };
