import Image from "next/image";
import Link from "next/link";

import { fn } from "@/lib";
import { Label } from "@/components/Shared/Label";

function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(price));
}

export function GridGames({ games = [] }) {
    return (
        <div className="-mx-2.5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => {
                const finalPrice = fn.calcDiscountedPrice(
                    game.price,
                    game.discount,
                );

                return (
                    <Link
                        key={game.documentId ?? game.id}
                        href={`/games/${game.slug}`}
                        className="group block px-2.5 pb-2.5 transition-opacity hover:opacity-60"
                    >
                        <div className="relative">
                            {game.cover?.url && (
                                <Image
                                    src={game.cover.url}
                                    alt={`Portada de ${game.title}`}
                                    width={game.cover.width ?? 640}
                                    height={game.cover.height ?? 360}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="block h-auto w-full rounded-2xl object-cover"
                                />
                            )}

                            {Number(game.discount) > 0 && (
                                <Label.Discount className="bottom-0 left-0">
                                    -{game.discount}%
                                </Label.Discount>
                            )}
                        </div>

                        <div className="flex items-start justify-between gap-4 pt-2">
                            <span className="min-w-0 font-medium text-foreground transition-colors group-hover:text-primary">
                                {game.title}
                            </span>

                            <span className="shrink-0 text-lg text-foreground transition-colors group-hover:text-primary">
                                {formatPrice(finalPrice)}
                            </span>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
