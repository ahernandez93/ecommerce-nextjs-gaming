"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Order as OrderCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { Order } from "./Order";

const orderCtrl = new OrderCtrl();

export function Orders() {
    const { user } = useAuth();

    const [orders, setOrders] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        let cancelled = false;

        async function loadOrders() {
            try {
                setError(null);

                const response = await orderCtrl.getAll(user.id);

                if (!cancelled) {
                    setOrders(response?.data ?? []);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("No se pudieron cargar los pedidos:", error);

                    setError("No se pudieron cargar los pedidos.");
                }
            }
        }

        loadOrders();

        return () => {
            cancelled = true;
        };
    }, [user?.id]);

    const isLoading = Boolean(user?.id) && orders === null && error === null;

    if (!user?.id) {
        return null;
    }
    
    if (isLoading) {
        return (
            <div
                role="status"
                aria-live="polite"
                className="flex items-center justify-center gap-2 py-10 text-muted-foreground"
            >
                <Loader2 aria-hidden="true" className="size-5 animate-spin" />

                <span>Cargando pedidos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <p
                role="alert"
                className="py-10 text-center text-sm text-destructive"
            >
                {error}
            </p>
        );
    }

    if (orders.length === 0) {
        return <NoResult text="No tienes ningún producto comprado" />;
    }

    return (
        <div className="space-y-5">
            {orders.map((order) => (
                <Order key={order.documentId ?? order.id} order={order} />
            ))}
        </div>
    );
}
