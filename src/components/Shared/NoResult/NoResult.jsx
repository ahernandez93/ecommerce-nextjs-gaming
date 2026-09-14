import { cn } from "@/lib/utils";

export function NoResult({ text, className }) {
    return (
        <div className={cn("mt-[50px] text-center", className)}>
            <p className="text-muted-foreground">{text}</p>
        </div>
    );
}
