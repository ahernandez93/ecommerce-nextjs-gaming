"use client";

import { useEffect, useState } from "react";
import { Order as OrderCtrl } from "@/api";
import { useAuth } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { Order } from "./Order";

const orderCtrl = new OrderCtrl();

export function Orders() {
    const { user } = useAuth();

    const [orders, setOrders] = useState(null);

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        let cancelled = false;

        async function loadOrders() {
            try {
                const response = await orderCtrl.getAll(user.id);

                if (!cancelled) {
                    setOrders(response?.data ?? []);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error("No se pudieron cargar los pedidos:", error);

                    setOrders([]);
                }
            }
        }

        loadOrders();

        return () => {
            cancelled = true;
        };
    }, [user?.id]);

    if (orders === null) {
        return null;
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
