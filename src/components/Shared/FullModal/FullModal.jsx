"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function FullModal({
    children,
    show,
    onClose,
    title = "Vista ampliada",
}) {
    function handleOpenChange(open) {
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog open={show} onOpenChange={handleOpenChange}>
            <DialogContent
                className="
                    !fixed !bottom-0 !left-0 !right-0 !top-0
                    !z-[100] !m-0 !block
                    !h-dvh !w-screen !max-w-none
                    !translate-x-0 !translate-y-0
                    !overflow-hidden !rounded-none
                    !border-0 !bg-[#222]
                    !p-0 !shadow-none
                    sm:!max-w-none

                    [&>button]:!right-4
                    [&>button]:!top-3
                    [&>button]:!z-[110]
                    [&>button]:!size-12
                    [&>button]:!text-[#db003f]
                    [&>button]:!opacity-100
                    [&>button:hover]:!opacity-60
                    [&>button>svg]:!h-10
                    [&>button>svg]:!w-10
                "
            >
                <DialogTitle className="sr-only">{title}</DialogTitle>

                {children}
            </DialogContent>
        </Dialog>
    );
}
