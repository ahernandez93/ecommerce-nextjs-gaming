import Image from "next/image";
import Link from "next/link";
import { DateTime } from "luxon";
import { Game } from "@/api";
import { Label, Container } from "@/components/Shared";
import { fn } from "@/lib";

const gameCtrl = new Game();

export async function BannerLastGamePublished() {
    let game = null;

    try {
        const response = await gameCtrl.getLastPublished();

        game = response?.data?.[0] ?? null;
    } catch (error) {
        console.error("No se pudo cargar el último juego publicado:", error);

        return null;
    }

    if (!game?.wallpaper?.url) {
        return null;
    }

    const price = fn.calcDiscountedPrice(game.price, game.discount);

    const relativeDate = game.releaseDate
        ? DateTime.fromISO(game.releaseDate).setLocale("es").toRelative()
        : null;

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(Number(price));

    const gameUrl = `/games/${game.slug}`;

    return (
        <section
            className="
                relative h-[600px] w-full overflow-hidden
                after:absolute after:bottom-[-1px] after:left-0
                after:z-20 after:h-[60px] after:w-full
                after:bg-background
                after:[clip-path:polygon(0_100%,100%_100%,0_0)]
            "
        >
            <Image
                src={game.wallpaper.url}
                alt={`Portada de ${game.title}`}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />

            <Link
                href={gameUrl}
                aria-label={`Ver información de ${game.title}`}
                className="absolute inset-0 z-10 flex items-center"
            >
                <Container>
                    {relativeDate && (
                        <span className="text-xs font-bold text-primary">
                            {relativeDate}
                        </span>
                    )}

                    <h2 className="mb-5 mt-[5px] text-2xl font-bold text-white">
                        {game.title}
                    </h2>

                    <div className="relative flex items-center">
                        {Number(game.discount) > 0 && (
                            <Label.Discount>-{game.discount}%</Label.Discount>
                        )}

                        <span
                            className={
                                Number(game.discount) > 0
                                    ? "ml-[65px] text-[30px] font-normal text-white"
                                    : "text-[30px] font-normal text-white"
                            }
                        >
                            {formattedPrice}
                        </span>
                    </div>
                </Container>
            </Link>
        </section>
    );
}
