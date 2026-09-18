"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useCart } from "@/hooks";
import { Button } from "@/components/ui/button";

export function AddToCartButton({ gameDocumentId }) {
    const { addCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    function handleAddToCart() {
        if (!gameDocumentId || isAdding) {
            return;
        }

        setIsAdding(true);
        addCart(gameDocumentId);

        window.setTimeout(() => {
            setIsAdding(false);
        }, 500);
    }

    return (
        <Button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="h-14 w-full text-base font-semibold"
        >
            {isAdding ? (
                <>
                    <LoaderCircle className="size-5 animate-spin" />
                    Añadiendo...
                </>
            ) : (
                "Comprar ahora"
            )}
        </Button>
    );
}
