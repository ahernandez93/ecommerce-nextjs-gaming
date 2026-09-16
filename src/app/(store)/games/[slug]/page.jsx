import { cache } from "react";
import { notFound } from "next/navigation";
import { Game as GameApi } from "@/api";
import { Game } from "./_components/Game";
import { Separator } from "@/components/Shared";

const gameCtrl = new GameApi();

const getGame = cache(async (slug) => {
    return gameCtrl.getBySlug(slug);
});

export async function generateMetadata({ params }) {
    const { slug } = await params;

    const game = await getGame(slug);

    if (!game) {
        return {
            title: "Juego no encontrado",
        };
    }

    return {
        title: game.title,
        description: game.summary || `Información sobre ${game.title}.`,
    };
}

export default async function GamePage({ params }) {
    const { slug } = await params;
    const game = await getGame(slug);

    // const resolvedParams = await params;
    // console.log("PARAMS DE LA RUTA:", resolvedParams);
    // const game = await getGame(resolvedParams.slug);
    // console.log("JUEGO OBTENIDO:", game);

    if (!game) {
        notFound();
    }

    return (
        <>
            <Game.HeaderWallpaper
                image={game.wallpaper?.url}
                alt={`Wallpaper de ${game.title}`}
            />

            <Game.Panel game={game} />

            <Separator height={50} />

            <Game.Info game={game} />

            <Separator height={30} />

            <Game.Media
                video={game.video}
                screenshots={game.screenshots ?? []}
            />

            <Separator height={50} />
        </>
    );
}
