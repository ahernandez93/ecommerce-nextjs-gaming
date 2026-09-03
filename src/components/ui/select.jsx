"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "radix-ui";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Select({ ...props }) {
    return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({ className, ...props }) {
    return (
        <SelectPrimitive.Group
            data-slot="select-group"
            className={cn("scroll-my-1 p-1", className)}
            {...props}
        />
    );
}

function SelectValue({ ...props }) {
    return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({ className, size = "default", children, ...props }) {
    return (
        <SelectPrimitive.Trigger
            data-slot="select-trigger"
            data-size={size}
            className={cn(
                "flex w-fit items-center justify-between gap-1.5",
                "rounded-[5px] border border-border bg-surface-deep",
                "px-2.5 text-sm whitespace-nowrap text-foreground",
                "outline-none transition-colors select-none",
                "data-[size=default]:h-8 data-[size=sm]:h-7",
                "data-[state=open]:border-primary",
                "hover:border-primary",
                "focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/20",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20",
                "data-placeholder:text-muted-foreground",
                "*:data-[slot=select-value]:line-clamp-1",
                "*:data-[slot=select-value]:flex",
                "*:data-[slot=select-value]:items-center",
                "*:data-[slot=select-value]:gap-1.5",
                "[&_svg]:pointer-events-none [&_svg]:shrink-0",
                "[&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            {children}

            <SelectPrimitive.Icon asChild>
                <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
            </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
    );
}

function SelectContent({
    className,
    children,
    position = "popper",
    align = "center",
    ...props
}) {
    return (
        <SelectPrimitive.Portal>
            <SelectPrimitive.Content
                data-slot="select-content"
                data-align-trigger={position === "item-aligned"}
                position={position}
                align={align}
                className={cn(
                    "relative z-50 min-w-36",
                    "max-h-(--radix-select-content-available-height)",
                    "origin-(--radix-select-content-transform-origin)",
                    "overflow-x-hidden overflow-y-auto",
                    "rounded-[6px] border-0 bg-surface text-foreground",
                    "shadow-md ring-0",
                    "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                    "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                    "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                    position === "popper" && [
                        "data-[side=bottom]:translate-y-2.5",
                        "data-[side=top]:-translate-y-2.5",
                        "data-[side=left]:-translate-x-2.5",
                        "data-[side=right]:translate-x-2.5",
                    ],
                    className,
                )}
                {...props}
            >
                <SelectScrollUpButton />

                <SelectPrimitive.Viewport
                    data-position={position}
                    className={cn(
                        "p-1",
                        "data-[position=popper]:h-(--radix-select-trigger-height)",
                        "data-[position=popper]:w-full",
                        "data-[position=popper]:min-w-(--radix-select-trigger-width)",
                    )}
                >
                    {children}
                </SelectPrimitive.Viewport>

                <SelectScrollDownButton />
            </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
    );
}

function SelectLabel({ className, ...props }) {
    return (
        <SelectPrimitive.Label
            data-slot="select-label"
            className={cn(
                "px-2 py-1.5 text-xs text-muted-foreground",
                className,
            )}
            {...props}
        />
    );
}

function SelectItem({ className, children, ...props }) {
    return (
        <SelectPrimitive.Item
            data-slot="select-item"
            className={cn(
                "relative flex w-full cursor-default items-center justify-center",
                "rounded-[4px] border-0 px-8 py-2 text-sm text-foreground",
                "outline-none select-none",
                "hover:bg-primary hover:text-primary-foreground",
                "focus:bg-primary focus:text-primary-foreground",
                "data-[state=checked]:bg-primary",
                "data-[state=checked]:text-primary-foreground",
                "data-disabled:pointer-events-none data-disabled:opacity-50",
                className,
            )}
            {...props}
        >
            <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <CheckIcon className="size-4" />
                </SelectPrimitive.ItemIndicator>
            </span>

            <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
    );
}

function SelectSeparator({ className, ...props }) {
    return (
        <SelectPrimitive.Separator
            data-slot="select-separator"
            className={cn(
                "pointer-events-none -mx-1 my-1 h-px bg-border",
                className,
            )}
            {...props}
        />
    );
}

function SelectScrollUpButton({ className, ...props }) {
    return (
        <SelectPrimitive.ScrollUpButton
            data-slot="select-scroll-up-button"
            className={cn(
                "z-10 flex cursor-default items-center justify-center bg-surface py-1",
                "[&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
    );
}

function SelectScrollDownButton({ className, ...props }) {
    return (
        <SelectPrimitive.ScrollDownButton
            data-slot="select-scroll-down-button"
            className={cn(
                "z-10 flex cursor-default items-center justify-center bg-surface py-1",
                "[&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        >
            <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
    );
}

export {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
};
