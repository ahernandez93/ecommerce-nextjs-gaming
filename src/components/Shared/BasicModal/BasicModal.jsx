"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export function BasicModal({ children, show, onClose, title, description }) {
    return (
        <Dialog
            open={show}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <DialogContent className="gap-0 rounded-xl p-7 sm:max-w-[680px] sm:p-[30px]">
                <DialogHeader className="mb-7 w-full items-start px-0">
                    <DialogTitle className="m-0 w-full p-0 text-left text-xl font-semibold">
                        {title}
                    </DialogTitle>

                    <DialogDescription className="sr-only">
                        {description ?? `Formulario de ${title.toLowerCase()}`}
                    </DialogDescription>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}
