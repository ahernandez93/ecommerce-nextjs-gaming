import { cache } from "react";
import { notFound, redirect } from "next/navigation";
import { Game, Platform } from "@/api";
import {
    Container,
    GridGames,
    NoResult,
    Pagination,
    Separator,
} from "@/components/Shared";

const platformCtrl = new Platform();
const gameCtrl = new Game();

const getPlatform = cache(async (slug) => {
    return platformCtrl.getBySlug(slug);
});

function parsePage(value) {
    const normalizedValue = Array.isArray(value) ? value[0] : value;

    const page = Number(normalizedValue);

    return Number.isInteger(page) && page > 0 ? page : 1;
}

export async function generateMetadata({ params }) {
    const { platform: platformSlug } = await params;

    const platform = await getPlatform(platformSlug);

    if (!platform) {
        return {
            title: "Plataforma no encontrada",
        };
    }

    return {
        title: `Juegos de ${platform.title}`,
        description: `Descubre todos los juegos disponibles para ${platform.title}.`,
    };
}

export default async function PlatformPage({ params, searchParams }) {
    const [{ platform: platformSlug }, resolvedSearchParams] =
        await Promise.all([params, searchParams]);

    const currentPage = parsePage(resolvedSearchParams.page);

    const [platform, gamesResponse] = await Promise.all([
        getPlatform(platformSlug),
        gameCtrl.getGamesByPlatformSlug({
            platformSlug,
            page: currentPage,
            pageSize: 9,
        }),
    ]);

    if (!platform) {
        notFound();
    }

    const games = gamesResponse.data;
    const pagination = gamesResponse.pagination;
    const hasGames = games.length > 0;

    if (pagination.pageCount > 0 && currentPage > pagination.pageCount) {
        redirect(`/games/${platformSlug}?page=${pagination.pageCount}`);
    }

    return (
        <section>
            <Container>
                <Separator height={50} />

                <h1 className="text-2xl font-semibold">{platform.title}</h1>

                {hasGames ? (
                    <>
                        <div className="mt-8">
                            <GridGames games={games} />
                        </div>

                        <Separator height={30} />

                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.pageCount}
                        />
                    </>
                ) : (
                    <NoResult
                        text={`La categoría ${platform.title} todavía no tiene juegos.`}
                    />
                )}

                <Separator height={100} />
            </Container>
        </section>
    );
}
