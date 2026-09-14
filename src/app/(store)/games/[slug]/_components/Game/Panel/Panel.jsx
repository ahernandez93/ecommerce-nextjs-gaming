import Image from "next/image";
import { Check, Tag } from "lucide-react";
import { Container, WishlistIcon } from "@/components/Shared";
import { Button } from "@/components/ui/button";
import { fn } from "@/lib";

export function Panel({ game }) {
    const platform = game.platform;

    const buyPrice = fn.calcDiscountedPrice(game.price, game.discount);

    const priceFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const originalPrice = priceFormatter.format(Number(game.price));
    const finalPrice = priceFormatter.format(Number(buyPrice));

    const hasDiscount = Number(game.discount) > 0;

    return (
        <Container className="relative z-20 -mt-[150px] flex">
            <div className="w-1/2 pr-3">
                {game.cover?.url && (
                    <Image
                        src={game.cover.url}
                        alt={`Portada de ${game.title}`}
                        width={1000}
                        height={562}
                        sizes="(max-width: 1127px) 50vw, 552px"
                        className="h-auto w-full rounded-[15px] object-cover"
                    />
                )}
            </div>

            <div className="h-full w-1/2 pl-3">
                <div className="relative flex flex-col items-center rounded-[15px] bg-secondary/80 p-5 backdrop-blur-[15px]">
                    <h2 className="mb-2.5 text-2xl font-bold">{game.title}</h2>

                    <div className="mb-10 flex rounded-full bg-secondary/80 px-[15px] py-1.5 backdrop-blur-[15px]">
                        {platform && (
                            <span className="mr-2.5 flex items-center border-r border-border pr-2.5 text-xs">
                                {platform.icon?.url && (
                                    <Image
                                        src={platform.icon.url}
                                        alt=""
                                        aria-hidden="true"
                                        width={18}
                                        height={18}
                                        className="mr-2.5 size-[18px] object-contain brightness-0 invert"
                                    />
                                )}

                                {platform.title}
                            </span>
                        )}

                        <span className="flex items-center text-xs">
                            <Check
                                aria-hidden="true"
                                className="mr-[5px] size-3.5 text-green-500"
                            />
                            En stock
                        </span>
                    </div>

                    <div className="mb-10 flex items-center">
                        {hasDiscount && (
                            <>
                                <span className="flex items-center text-lg line-through">
                                    <Tag
                                        aria-hidden="true"
                                        className="mr-1 size-3"
                                    />

                                    {originalPrice}
                                </span>

                                <span className="mx-2.5 text-lg font-bold text-primary">
                                    -{game.discount}%
                                </span>
                            </>
                        )}

                        <span className="text-[35px] leading-none">
                            {finalPrice}
                        </span>
                    </div>

                    <Button type="button" className="h-12 w-full">
                        Comprar ahora
                    </Button>

                    <WishlistIcon
                        className="
                            absolute right-[15px] top-[15px]
                            text-xl
                        "
                    />
                </div>
            </div>
        </Container>
    );
}
