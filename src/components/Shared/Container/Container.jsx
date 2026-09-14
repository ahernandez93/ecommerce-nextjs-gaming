import { cn } from "@/lib/utils";

export function Container({ children, className }) {
    return (
        <div
            className={cn(
                "mx-auto w-full max-w-[1127px] px-4 sm:px-6 lg:px-8 xl:px-0",
                className,
            )}
        >
            {children}
        </div>
    );
}
