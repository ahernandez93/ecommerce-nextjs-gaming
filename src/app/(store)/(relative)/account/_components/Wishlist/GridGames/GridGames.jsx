"use client";

import Image from "next/image";
import Link from "next/link";

import { Label, WishlistIcon } from "@/components/Shared";
import { fn } from "@/lib";

const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function GridGames({ wishlist, onRemove }) {
    return (
        <div
            className="
                mt-5 grid grid-cols-1 gap-5
                sm:grid-cols-2 lg:grid-cols-3
            "
        >
            {wishlist.map((item) => {
                const game = item.game;
                const cover = game?.cover;
                const hasDiscount = Number(game?.discount) > 0;

                if (!game) {
                    return null;
                }

                const finalPrice = fn.calcDiscountedPrice(
                    game.price,
                    game.discount,
                );

                return (
                    <article
                        key={item.documentId ?? item.id}
                        className="relative min-w-0"
                    >
                        <Link
                            href={`/games/${game.slug}`}
                            className="
                                group block text-foreground
                            "
                        >
                            <div
                                className="
                                    relative aspect-video
                                    overflow-hidden rounded-2xl
                                    bg-secondary
                                    transition-opacity
                                    group-hover:opacity-60
                                "
                            >
                                {cover?.url && (
                                    <Image
                                        src={cover.url}
                                        alt={`Portada de ${game.title}`}
                                        fill
                                        sizes="
                                            (max-width: 640px) 100vw,
                                            (max-width: 1024px) 50vw,
                                            33vw
                                        "
                                        className="object-cover"
                                    />
                                )}

                                {hasDiscount && (
                                    <Label.Discount
                                        className="
                                            !absolute
                                            bottom-0 left-0
                                        "
                                    >
                                        -{game.discount}%
                                    </Label.Discount>
                                )}
                            </div>

                            <div
                                className="
                                    mt-2 flex items-start
                                    justify-between gap-4
                                    transition-colors
                                    group-hover:text-primary
                                "
                            >
                                <span className="min-w-0">{game.title}</span>

                                <span
                                    className="
                                        shrink-0 text-lg
                                    "
                                >
                                    {priceFormatter.format(Number(finalPrice))}
                                </span>
                            </div>
                        </Link>

                        <WishlistIcon
                            gameDocumentId={game.documentId}
                            initialWishlistEntry={item}
                            removeCallback={onRemove}
                            className="
                                absolute right-3.75 top-3.75
                                z-10 size-8 rounded-full
                                bg-black/60 text-xl
                            "
                        />
                    </article>
                );
            })}
        </div>
    );
}
