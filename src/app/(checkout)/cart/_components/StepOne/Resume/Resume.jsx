"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fn } from "@/lib";

const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function Resume({ games }) {
    const router = useRouter();

    const totals = games.reduce(
        (result, game) => {
            const originalPrice = Number(game.price);

            const discountedPrice = Number(
                fn.calcDiscountedPrice(game.price, game.discount),
            );

            const quantity = Number(game.quantity);

            return {
                original: result.original + originalPrice * quantity,

                discount:
                    result.discount +
                    (originalPrice - discountedPrice) * quantity,

                subtotal: result.subtotal + discountedPrice * quantity,
            };
        },
        {
            original: 0,
            discount: 0,
            subtotal: 0,
        },
    );

    function goToStepTwo() {
        router.replace("/cart?step=2");
    }

    return (
        <section>
            <h2 className="mb-[15px] text-[18px] font-bold">Resumen</h2>

            <div className="flex w-full flex-col items-center rounded-[15px] bg-[#333333] p-5">
                <div className="mb-5 flex w-full flex-col">
                    <div className="flex justify-between">
                        <span className="text-[13px] text-[#8a8a8a]">
                            Precio oficial
                        </span>

                        <span className="text-[13px] text-[#8a8a8a]">
                            {priceFormatter.format(totals.original)}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-[13px] text-[#8a8a8a]">
                            Descuento
                        </span>

                        <span className="text-[13px] text-[#8a8a8a]">
                            {priceFormatter.format(totals.discount)}
                        </span>
                    </div>

                    <div className="mt-[10px] flex justify-between">
                        <span className="text-[13px] text-white">Subtotal</span>

                        <span className="text-base text-white">
                            {priceFormatter.format(totals.subtotal)}
                        </span>
                    </div>
                </div>

                <Button
                    type="button"
                    onClick={goToStepTwo}
                    className="h-[46px] w-full font-bold"
                >
                    Proceder con el pago
                </Button>

                <Link
                    href="/"
                    className="mt-5 text-xs text-[#8a8a8a] transition-colors hover:text-primary"
                >
                    Continuar comprando
                </Link>
            </div>
        </section>
    );
}
