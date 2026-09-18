"use client";

import { useEffect, useState } from "react";
import { Game } from "@/api";
import { useCart } from "@/hooks";
import { NoResult } from "@/components/Shared";
import { Cart } from "..";

const gameCtrl = new Game();

export function CartContent({ currentStep }) {
    const { cart } = useCart();

    const [games, setGames] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadGames() {
            try {
                const data = await Promise.all(
                    cart.map(async (item) => {
                        const game = await gameCtrl.getGameByDocumentId(
                            item.documentId,
                        );

                        if (!game) {
                            return null;
                        }

                        return {
                            ...game,
                            quantity: item.quantity,
                        };
                    }),
                );

                if (cancelled) return;

                setGames(data.filter(Boolean));
            } catch (error) {
                if (cancelled) return;

                console.error(
                    "No se pudieron cargar los juegos del carrito:",
                    error,
                );

                setGames([]);
            }
        }

        loadGames();

        return () => {
            cancelled = true;
        };
    }, [cart]);

    if (games === null) {
        return null;
    }

    if (games.length === 0) {
        return <NoResult text="No tienes juegos en la cesta" />;
    }

    if (currentStep === 1) {
        return <Cart.StepOne games={games} />;
    }

    return null;
}
