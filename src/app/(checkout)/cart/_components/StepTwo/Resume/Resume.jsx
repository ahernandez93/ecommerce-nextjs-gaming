"use client";

import { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Cart } from "@/api";
import { useAuth, useCart } from "@/hooks";
import { fn } from "@/lib";
import { Button } from "@/components/ui/button";

const cartCtrl = new Cart();

const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function Resume({ games, addressSelected }) {
    const stripe = useStripe();
    const elements = useElements();

    const router = useRouter();
    const searchParams = useSearchParams();

    const { user } = useAuth();
    const { deleteAllItems } = useCart();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const total = games.reduce((accumulator, game) => {
        const price = fn.calcDiscountedPrice(game.price, game.discount);

        return accumulator + Number(price) * Number(game.quantity);
    }, 0);

    function goToStepThree() {
        const params = new URLSearchParams(searchParams.toString());

        params.set("step", "3");

        router.replace(`/cart?${params.toString()}`);
    }

    async function handlePayment() {
        if (!stripe || !elements || !addressSelected || !user) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            const result = await stripe.createToken(cardElement);

            if (result.error) {
                setError(
                    result.error.message || "No se pudo validar la tarjeta.",
                );

                return;
            }

            await cartCtrl.paymentCart(
                result.token,
                games,
                user.id,
                addressSelected,
            );

            deleteAllItems();
            goToStepThree();
        } catch (error) {
            console.error("No se pudo completar el pago:", error);

            setError(error.message || "No se pudo completar el pago.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section>
            <h2 className="mb-[15px] text-[18px] font-bold">Resumen</h2>

            <div className="mb-[25px] flex w-full flex-col items-center rounded-[15px] bg-[#333333] p-5">
                <div className="flex w-full flex-col">
                    {games.map((game) => {
                        const price = fn.calcDiscountedPrice(
                            game.price,
                            game.discount,
                        );

                        return (
                            <div
                                key={game.documentId}
                                className="flex items-center justify-between border-b border-[#444444] py-[10px] last:border-0 last:pb-0"
                            >
                                <div className="flex min-w-0 flex-col justify-center">
                                    <p className="truncate pr-[50px] font-bold">
                                        {game.title}
                                    </p>

                                    <span className="text-[10px] text-[#8a8a8a]">
                                        {game.platform?.title}
                                    </span>
                                </div>

                                <span className="whitespace-nowrap text-xs text-[#8a8a8a]">
                                    {game.quantity > 0 && `${game.quantity}x`}
                                    {priceFormatter.format(Number(price))}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="mb-[25px] flex w-full flex-col items-center rounded-[15px] bg-[#333333] p-5">
                <div className="mb-[30px] flex w-full justify-between">
                    <span className="font-bold">Total</span>

                    <span className="text-[18px] font-bold">
                        {priceFormatter.format(total)}
                    </span>
                </div>

                <Button
                    type="button"
                    onClick={handlePayment}
                    disabled={!addressSelected || !stripe || loading}
                    className="h-[46px] w-full"
                >
                    {loading ? "Procesando..." : "Pagar"}
                </Button>

                {error && (
                    <p role="alert" className="mt-3 text-sm text-destructive">
                        {error}
                    </p>
                )}
            </div>
        </section>
    );
}
