"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hooks";
import { fn } from "@/lib";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const quantities = Array.from({ length: 50 }, (_, index) => index + 1);

const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function Basket({ games }) {
    const { changeQuantityItem, deleteItem } = useCart();

    return (
        <section>
            <h2 className="mb-[15px] text-[18px] font-bold">Cesta</h2>

            <div className="flex w-full flex-col rounded-[15px] bg-[#333333] p-5">
                {games.map((game) => {
                    const price = fn.calcDiscountedPrice(
                        game.price,
                        game.discount,
                    );

                    return (
                        <article
                            key={game.documentId}
                            className="mb-5 flex border-b border-[#444444] pb-5 last:mb-0 last:border-b-0 last:pb-0"
                        >
                            {game.cover?.url && (
                                <Image
                                    src={game.cover.url}
                                    alt={`Portada de ${game.title}`}
                                    width={190}
                                    height={108}
                                    sizes="190px"
                                    className="mr-5 h-[108px] w-[190px] shrink-0 rounded-lg object-cover"
                                />
                            )}

                            <div className="flex min-w-0 flex-1">
                                <div className="flex min-w-0 flex-1 flex-col justify-between py-[10px]">
                                    <div>
                                        <p className="truncate font-bold">
                                            {game.title}
                                        </p>

                                        <p className="text-xs text-[#8a8a8a]">
                                            {game.platform?.title}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            deleteItem(game.documentId)
                                        }
                                        aria-label={`Eliminar ${game.title} del carrito`}
                                        className="w-fit text-white transition-colors hover:text-primary"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>

                                <div className="flex shrink-0 items-center">
                                    <Select
                                        value={String(game.quantity)}
                                        onValueChange={(value) =>
                                            changeQuantityItem(
                                                game.documentId,
                                                Number(value),
                                            )
                                        }
                                    >
                                        <SelectTrigger
                                            aria-label={`Cantidad de ${game.title}`}
                                            className="h-[38px] w-[54px] border-0 bg-[#111111] px-3 text-white shadow-none focus:ring-0"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>

                                        <SelectContent className="border-[#444444] bg-[#111111] text-white">
                                            {quantities.map((quantity) => (
                                                <SelectItem
                                                    key={quantity}
                                                    value={String(quantity)}
                                                >
                                                    {quantity}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <span className="ml-[10px] whitespace-nowrap font-bold">
                                        {priceFormatter.format(Number(price))}
                                    </span>
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
