import { Game } from "@/api";
import { GridGames } from "@/components/Shared";

const gameCtrl = new Game();

export async function LatestGames({ title, limit = 9, platformId = null }) {
    let games = [];

    try {
        const response = await gameCtrl.getLatestPublished({
            limit,
            platformId,
        });

        games = response?.data ?? [];
    } catch (error) {
        console.error("No se pudieron cargar los juegos:", error);

        return (
            <p role="alert" className="text-sm text-destructive">
                No se pudieron cargar los juegos.
            </p>
        );
    }

    if (games.length === 0) {
        return (
            <section>
                <h2 className="text-2xl font-semibold">{title}</h2>

                <p className="mt-5 text-muted-foreground">
                    No hay juegos disponibles.
                </p>
            </section>
        );
    }

    return (
        <section>
            <h2 className="text-2xl font-semibold">{title}</h2>

            <GridGames games={games} />
        </section>
    );
}
