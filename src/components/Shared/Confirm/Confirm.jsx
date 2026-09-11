"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function Confirm({
    open,
    onCancel,
    onConfirm,
    title = "Confirmar acción",
    content = "¿Estás seguro de que quieres continuar?",
    confirmText = "Eliminar",
    cancelText = "Cancelar",
}) {
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async (event) => {
        // Evita que Radix cierre el diálogo antes de terminar la petición.
        event.preventDefault();
        setIsLoading(true);

        try {
            await onConfirm?.();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={(nextOpen) => {
                if (!nextOpen && !isLoading) {
                    onCancel?.();
                }
            }}
        >
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>

                    <AlertDialogDescription>{content}</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        {cancelText}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={handleConfirm}
                        className="bg-destructive text-white hover:bg-destructive/90"
                    >
                        {isLoading && (
                            <Loader2
                                className="animate-spin"
                                aria-hidden="true"
                            />
                        )}

                        {isLoading ? "Eliminando..." : confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
