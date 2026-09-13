"use client";

import { useEffect, useState } from "react";

import { Game } from "@/api";
import { GridGames } from "@/components/Shared";

const gameCtrl = new Game();

export function LatestGames({ title, limit = 9, platformId = null }) {
    const [games, setGames] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        gameCtrl
            .getLatestPublished({
                limit,
                platformId,
            })
            .then((response) => {
                if (ignore) return;

                setGames(response?.data ?? []);
                setError(null);
            })
            .catch((error) => {
                if (ignore) return;

                console.error("No se pudieron cargar los juegos:", error);

                setError("No se pudieron cargar los juegos.");
            });

        return () => {
            ignore = true;
        };
    }, [limit, platformId]);

    if (error) {
        return (
            <p role="alert" className="text-sm text-destructive">
                {error}
            </p>
        );
    }

    if (games === null) {
        return null;
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
