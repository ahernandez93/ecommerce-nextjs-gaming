"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Address as AddressCtrl } from "@/api";
import { useAuth } from "@/hooks";

import { Address } from "./Address";

const addressCtrl = new AddressCtrl();

export function ListAddresses({ reload, onReload }) {
    const { user } = useAuth();

    const [addresses, setAddresses] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id) return;

        let ignore = false;

        addressCtrl
            .getAll(user.id)
            .then((response) => {
                if (ignore) return;

                setAddresses(response?.data ?? []);
                setError(null);
            })
            .catch((error) => {
                console.error("No se pudieron cargar las direcciones:", error);

                if (ignore) return;

                setError(
                    "No se pudieron cargar tus direcciones. Inténtalo nuevamente.",
                );
            });

        return () => {
            ignore = true;
        };
    }, [user?.id, reload]);

    const isLoading = Boolean(user?.id) && addresses === null && error === null;

    if (!user?.id) {
        return null;
    }

    if (isLoading) {
        return (
            <div className="mt-6 flex items-center justify-center gap-2 py-10 text-muted-foreground">
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                <span>Cargando direcciones...</span>
            </div>
        );
    }

    if (error) {
        return (
            <p
                role="alert"
                className="mt-6 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
            >
                {error}
            </p>
        );
    }

    if (addresses.length === 0) {
        return (
            <div className="mt-6 rounded-[10px] bg-muted/60 px-5 py-8 text-center">
                <p className="font-medium">Todavía no tienes direcciones.</p>

                <p className="mt-1 text-sm text-muted-foreground">
                    Usa el botón Crear para agregar tu primera dirección.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-5">
            {addresses.map((address) => (
                <Address
                    key={address.documentId ?? address.id}
                    addressId={address.documentId}
                    address={address}
                    onReload={onReload}
                />
            ))}
        </div>
    );
}
