"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

import { Wishlist } from "@/api";
import { useAuth } from "@/hooks";
import { cn } from "@/lib/utils";

const wishlistCtrl = new Wishlist();

export function WishlistIcon({
    gameDocumentId,
    initialWishlistEntry = null,
    className,
    removeCallback,
}) {
    const router = useRouter();
    const { user } = useAuth();

    const userId = user?.id;

    const requestKey =
        userId !== null && userId !== undefined && gameDocumentId
            ? `${userId}:${gameDocumentId}`
            : null;

    const [wishlistState, setWishlistState] = useState(() => ({
        key: initialWishlistEntry && requestKey ? requestKey : null,
        entry: initialWishlistEntry,
    }));

    const [isMutating, setIsMutating] = useState(false);

    useEffect(() => {
        if (!requestKey || wishlistState.key === requestKey) {
            return;
        }

        let cancelled = false;

        async function checkWishlist() {
            try {
                const response = await wishlistCtrl.check(
                    userId,
                    gameDocumentId,
                );

                if (cancelled) return;

                setWishlistState({
                    key: requestKey,
                    entry: response,
                });
            } catch (error) {
                if (cancelled) return;

                console.error(
                    "No se pudo comprobar la lista de deseos:",
                    error,
                );

                setWishlistState({
                    key: requestKey,
                    entry: null,
                });
            }
        }

        checkWishlist();

        return () => {
            cancelled = true;
        };
    }, [requestKey, userId, gameDocumentId, wishlistState.key]);

    const isChecking = Boolean(requestKey) && wishlistState.key !== requestKey;

    const wishlistEntry =
        wishlistState.key === requestKey ? wishlistState.entry : null;

    const hasWishlist = Boolean(wishlistEntry);

    async function addWishlist() {
        if (!userId) {
            router.push("/join/sign-in");
            return;
        }

        if (!gameDocumentId || isMutating) {
            return;
        }

        try {
            setIsMutating(true);

            const response = await wishlistCtrl.add(userId, gameDocumentId);

            setWishlistState({
                key: requestKey,
                entry: response,
            });
        } catch (error) {
            console.error("No se pudo agregar el juego a favoritos:", error);
        } finally {
            setIsMutating(false);
        }
    }

    async function deleteWishlist() {
        if (!wishlistEntry || isMutating) {
            return;
        }

        const wishlistDocumentId = wishlistEntry.documentId;

        if (!wishlistDocumentId) {
            console.error("El registro de wishlist no tiene documentId.");
            return;
        }

        try {
            setIsMutating(true);

            await wishlistCtrl.delete(wishlistDocumentId);

            setWishlistState({
                key: requestKey,
                entry: null,
            });

            removeCallback?.(wishlistDocumentId);
        } catch (error) {
            console.error("No se pudo eliminar el juego de favoritos:", error);
        } finally {
            setIsMutating(false);
        }
    }

    if (isChecking) {
        return (
            <span
                aria-hidden="true"
                className={cn(
                    `
                        inline-flex items-center
                        justify-center text-primary
                        opacity-50
                    `,
                    className,
                )}
            >
                <Heart className="size-5 animate-pulse" />
            </span>
        );
    }

    return (
        <button
            type="button"
            onClick={hasWishlist ? deleteWishlist : addWishlist}
            disabled={isMutating}
            aria-label={
                hasWishlist
                    ? "Eliminar de la lista de deseos"
                    : "Agregar a la lista de deseos"
            }
            aria-pressed={hasWishlist}
            aria-busy={isMutating}
            className={cn(
                `
                    inline-flex items-center justify-center
                    border-0 bg-transparent p-0
                    text-primary transition-opacity
                    hover:opacity-60
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                `,
                className,
            )}
        >
            <Heart
                aria-hidden="true"
                className={cn("size-5", hasWishlist && "fill-current")}
            />
        </button>
    );
}
