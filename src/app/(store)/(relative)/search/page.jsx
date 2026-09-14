import { redirect } from "next/navigation";
import { Game } from "@/api";
import {
    Container,
    GridGames,
    NoResult,
    Pagination,
    Separator,
} from "@/components/Shared";

const gameCtrl = new Game();

function getSingleValue(value) {
    return Array.isArray(value) ? value[0] : value;
}

function parseSearchText(value) {
    const searchText = getSingleValue(value);

    return String(searchText ?? "")
        .trim()
        .slice(0, 100);
}

function parsePage(value) {
    const normalizedValue = getSingleValue(value);

    const page = Number(normalizedValue);

    return Number.isInteger(page) && page > 0 ? page : 1;
}

function createSearchUrl({ searchText, page }) {
    const params = new URLSearchParams();

    if (searchText) {
        params.set("s", searchText);
    }

    if (page > 1) {
        params.set("page", String(page));
    }

    const query = params.toString();

    return query ? `/search?${query}` : "/search";
}

export async function generateMetadata({ searchParams }) {
    const resolvedSearchParams = await searchParams;

    const searchText = parseSearchText(resolvedSearchParams.s);

    if (!searchText) {
        return {
            title: "Buscar juegos",
            description: "Busca juegos disponibles en nuestra tienda.",
        };
    }

    return {
        title: `Resultados para ${searchText}`,
        description: `Resultados de búsqueda para ${searchText}.`,
    };
}

export default async function SearchPage({ searchParams }) {
    const resolvedSearchParams = await searchParams;
    const searchText = parseSearchText(resolvedSearchParams.s);
    const currentPage = parsePage(resolvedSearchParams.page);

    let games = [];

    let pagination = {
        page: currentPage,
        pageSize: 30,
        pageCount: 0,
        total: 0,
    };

    if (searchText) {
        const response = await gameCtrl.searchGames({
            text: searchText,
            page: currentPage,
            pageSize: 30,
        });

        games = response?.data ?? [];

        pagination = response?.meta?.pagination ?? pagination;
    }

    if (pagination.pageCount > 0 && currentPage > pagination.pageCount) {
        redirect(
            createSearchUrl({
                searchText,
                page: pagination.pageCount,
            }),
        );
    }

    const hasResults = games.length > 0;

    return (
        <section>
            <Container>
                <Separator height={50} />

                <h1 className="text-2xl font-semibold">
                    {searchText ? `Buscando: ${searchText}` : "Buscar juegos"}
                </h1>

                {!searchText ? (
                    <NoResult text="Escribe el nombre de un juego en el buscador." />
                ) : hasResults ? (
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
                    <NoResult text="No se han encontrado resultados." />
                )}

                <Separator height={100} />
            </Container>
        </section>
    );
}
