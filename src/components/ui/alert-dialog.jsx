"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function AlertDialog({ ...props }) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }) {
    return (
        <AlertDialogPrimitive.Trigger
            data-slot="alert-dialog-trigger"
            {...props}
        />
    );
}

function AlertDialogPortal({ ...props }) {
    return (
        <AlertDialogPrimitive.Portal
            data-slot="alert-dialog-portal"
            {...props}
        />
    );
}

function AlertDialogOverlay({ className, ...props }) {
    return (
        <AlertDialogPrimitive.Overlay
            data-slot="alert-dialog-overlay"
            className={cn(
                "fixed inset-0 z-50 bg-black/60",
                "supports-backdrop-filter:backdrop-blur-xs",
                "data-open:animate-in data-open:fade-in-0",
                "data-closed:animate-out data-closed:fade-out-0",
                className,
            )}
            {...props}
        />
    );
}

function AlertDialogContent({
    className,
    size = "default",
    children,
    ...props
}) {
    return (
        <AlertDialogPortal>
            <AlertDialogOverlay />

            <AlertDialogPrimitive.Content
                data-slot="alert-dialog-content"
                data-size={size}
                className={cn(
                    "fixed top-1/2 left-1/2 z-50 grid w-full",
                    "max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
                    "overflow-hidden rounded-[12px] bg-background",
                    "text-foreground ring-1 ring-border",
                    "outline-none",
                    "sm:max-w-sm",
                    "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                    "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                    className,
                )}
                {...props}
            >
                {children}
            </AlertDialogPrimitive.Content>
        </AlertDialogPortal>
    );
}

function AlertDialogHeader({ className, ...props }) {
    return (
        <div
            data-slot="alert-dialog-header"
            className={cn(
                "flex flex-col gap-2 bg-background",
                "px-5 pt-5",
                "text-left",
                className,
            )}
            {...props}
        />
    );
}

function AlertDialogFooter({ className, ...props }) {
    return (
        <div
            data-slot="alert-dialog-footer"
            className={cn(
                "grid grid-cols-2 items-center gap-4",
                "bg-background p-5",
                className,
            )}
            {...props}
        />
    );
}

function AlertDialogMedia({ className, ...props }) {
    return (
        <div
            data-slot="alert-dialog-media"
            className={cn(
                "mb-2 inline-flex size-10 items-center justify-center",
                "rounded-md bg-surface-elevated",
                "*:[svg:not([class*='size-'])]:size-6",
                className,
            )}
            {...props}
        />
    );
}

function AlertDialogTitle({ className, ...props }) {
    return (
        <AlertDialogPrimitive.Title
            data-slot="alert-dialog-title"
            className={cn(
                "font-heading text-lg font-medium text-foreground",
                className,
            )}
            {...props}
        />
    );
}

function AlertDialogDescription({ className, ...props }) {
    return (
        <AlertDialogPrimitive.Description
            data-slot="alert-dialog-description"
            className={cn(
                "text-lg leading-relaxed text-foreground",
                "*:[a]:underline *:[a]:underline-offset-3",
                "*:[a]:hover:text-primary",
                className,
            )}
            {...props}
        />
    );
}

function AlertDialogAction({
    className,
    variant = "default",
    size = "default",
    ...props
}) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Action
                data-slot="alert-dialog-action"
                className={cn("w-full", className)}
                {...props}
            />
        </Button>
    );
}

function AlertDialogCancel({
    className,
    variant = "outline",
    size = "default",
    ...props
}) {
    return (
        <Button variant={variant} size={size} asChild>
            <AlertDialogPrimitive.Cancel
                data-slot="alert-dialog-cancel"
                className={cn("w-full", className)}
                {...props}
            />
        </Button>
    );
}

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogOverlay,
    AlertDialogPortal,
    AlertDialogTitle,
    AlertDialogTrigger,
};
