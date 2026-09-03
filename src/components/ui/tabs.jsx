"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            data-orientation={orientation}
            orientation={orientation}
            className={cn(
                "group/tabs flex gap-2",
                "data-horizontal:flex-col",
                className,
            )}
            {...props}
        />
    );
}

function TabsList({ className, ...props }) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                "group/tabs-list inline-flex w-fit items-center",
                "bg-transparent text-foreground",
                "group-data-horizontal/tabs:w-full",
                "group-data-horizontal/tabs:justify-start",
                "group-data-horizontal/tabs:border-b-2",
                "group-data-horizontal/tabs:border-border",
                "group-data-vertical/tabs:flex-col",
                "group-data-vertical/tabs:border-r-2",
                "group-data-vertical/tabs:border-border",
                className,
            )}
            {...props}
        />
    );
}

function TabsTrigger({ className, ...props }) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "relative inline-flex items-center justify-center gap-1.5",
                "px-4 py-2 text-sm font-bold whitespace-nowrap",
                "text-foreground outline-none transition-colors",
                "group-data-horizontal/tabs:-mb-0.5",
                "group-data-horizontal/tabs:border-b-2",
                "group-data-horizontal/tabs:border-transparent",
                "group-data-vertical/tabs:-mr-0.5",
                "group-data-vertical/tabs:w-full",
                "group-data-vertical/tabs:justify-start",
                "group-data-vertical/tabs:border-r-2",
                "group-data-vertical/tabs:border-transparent",
                "hover:border-primary hover:text-primary",
                "focus-visible:border-primary focus-visible:text-primary",
                "focus-visible:ring-[3px] focus-visible:ring-primary/20",
                "data-[state=active]:border-primary",
                "data-[state=active]:text-primary",
                "disabled:pointer-events-none disabled:opacity-50",
                "[&_svg]:pointer-events-none [&_svg]:shrink-0",
                "[&_svg]:text-primary",
                "[&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    );
}

function TabsContent({ className, ...props }) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn(
                "flex-1 bg-transparent pt-5 text-sm outline-none",
                "focus-visible:ring-[3px] focus-visible:ring-primary/20",
                className,
            )}
            {...props}
        />
    );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
