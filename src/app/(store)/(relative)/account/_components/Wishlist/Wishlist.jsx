"use client";

import { useEffect, useState } from "react";
import { Wishlist as WishlistCtrl } from "@/api";
import { NoResult } from "@/components/Shared";
import { useAuth } from "@/hooks";
import { GridGames } from "./GridGames";

const wishlistCtrl = new WishlistCtrl();

export function Wishlist() {
    const { user } = useAuth();
    const userId = user?.id;

    const userKey =
        userId !== null && userId !== undefined ? String(userId) : null;

    const [wishlistState, setWishlistState] = useState({
        key: null,
        items: null,
        error: null,
    });

    useEffect(() => {
        if (!userKey) {
            return;
        }

        let cancelled = false;

        async function loadWishlist() {
            try {
                const response = await wishlistCtrl.getAll(userId);

                if (cancelled) return;

                setWishlistState({
                    key: userKey,
                    items: response,
                    error: null,
                });
            } catch (error) {
                if (cancelled) return;

                console.error("No se pudo cargar la lista de deseos:", error);

                setWishlistState({
                    key: userKey,
                    items: [],
                    error: "No se pudo cargar la lista de deseos.",
                });
            }
        }

        loadWishlist();

        return () => {
            cancelled = true;
        };
    }, [userId, userKey]);

    function removeWishlistItem(wishlistDocumentId) {
        setWishlistState((previousState) => ({
            ...previousState,
            items:
                previousState.items?.filter(
                    (item) => item.documentId !== wishlistDocumentId,
                ) ?? [],
        }));
    }

    const wishlist = wishlistState.key === userKey ? wishlistState.items : null;

    const validWishlist = wishlist?.filter((item) => item?.game) ?? [];

    if (!userKey || wishlist === null) {
        return (
            <div
                className="
                    mt-5 grid grid-cols-1 gap-5
                    sm:grid-cols-2 lg:grid-cols-3
                "
            >
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="
                            aspect-video animate-pulse
                            rounded-2xl bg-secondary
                        "
                    />
                ))}
            </div>
        );
    }

    if (wishlistState.error) {
        return (
            <p role="alert" className="mt-5 text-sm text-destructive">
                {wishlistState.error}
            </p>
        );
    }

    if (validWishlist.length === 0) {
        return <NoResult text="No tienes ningún juego en la lista de deseos" />;
    }

    return <GridGames wishlist={validWishlist} onRemove={removeWishlistItem} />;
}
