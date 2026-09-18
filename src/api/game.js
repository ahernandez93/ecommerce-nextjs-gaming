import { ENV } from "@/lib";

export class Game {
    async getLastPublished() {
        try {
            const params = new URLSearchParams();

            params.set("sort[0]", "publishedAt:desc");
            params.set("pagination[limit]", "1");
            params.set("populate", "*");

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${params.toString()}`;

            const response = await fetch(url, {
                next: {
                    revalidate: 60,
                },
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    `Error HTTP ${response.status}`;

                throw new Error(message);
            }

            return result;
        } catch (error) {
            throw new Error(
                `Error al obtener el último juego publicado: ${error.message}`,
            );
        }
    }

    async getLatestPublished({ limit = 9, platformId = null } = {}) {
        try {
            const params = new URLSearchParams();

            params.set("sort[0]", "publishedAt:desc");
            params.set("pagination[limit]", String(limit));
            params.set("populate", "*");

            if (platformId !== null && platformId !== undefined) {
                params.set("filters[platform][id][$eq]", String(platformId));
            }

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${params.toString()}`;

            const response = await fetch(url, {
                next: {
                    revalidate: 60,
                },
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    `Error HTTP ${response.status}`;

                throw new Error(message);
            }

            return result;
        } catch (error) {
            throw new Error(
                `Error al obtener los últimos juegos publicados: ${error.message}`,
            );
        }
    }

    async getGamesByPlatformSlug({
        platformSlug,
        page = 1,
        pageSize = 9,
    } = {}) {
        try {
            if (!platformSlug) {
                throw new Error("El slug de la plataforma es obligatorio");
            }

            const params = new URLSearchParams({
                "filters[platform][slug][$eq]": platformSlug,
                "pagination[page]": String(page),
                "pagination[pageSize]": String(pageSize),
                "sort[0]": "publishedAt:desc",
                populate: "*",
            });

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${params.toString()}`;

            const response = await fetch(url, {
                cache: "no-store",
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    `Error HTTP ${response.status}`;

                throw new Error(message);
            }

            return {
                data: result?.data ?? [],
                pagination: result?.meta?.pagination ?? {
                    page: 1,
                    pageSize,
                    pageCount: 0,
                    total: 0,
                },
            };
        } catch (error) {
            throw new Error(
                `Error al obtener los juegos de la plataforma: ${error.message}`,
            );
        }
    }

    async searchGames({ text, page = 1, pageSize = 9 } = {}) {
        try {
            const searchText = String(text ?? "").trim();

            const currentPage =
                Number.isInteger(Number(page)) && Number(page) > 0
                    ? Number(page)
                    : 1;

            if (!searchText) {
                return {
                    data: [],
                    meta: {
                        pagination: {
                            page: currentPage,
                            pageSize,
                            pageCount: 0,
                            total: 0,
                        },
                    },
                };
            }

            const params = new URLSearchParams();

            params.set("filters[title][$containsi]", searchText);
            params.set("pagination[page]", String(currentPage));
            params.set("pagination[pageSize]", String(pageSize));
            params.set("sort[0]", "publishedAt:desc");
            params.set("populate", "*");

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${params.toString()}`;

            const response = await fetch(url, {
                next: {
                    revalidate: 60,
                },
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    `Error HTTP ${response.status}`;

                throw new Error(message);
            }

            return result;
        } catch (error) {
            throw new Error(`Error al buscar juegos: ${error.message}`);
        }
    }

    async getBySlug(slug) {
        try {
            const normalizedSlug = String(slug ?? "").trim();

            if (!normalizedSlug) {
                throw new Error("El slug del juego es obligatorio");
            }

            const params = new URLSearchParams();

            params.set("filters[slug][$eq]", normalizedSlug);
            params.set("pagination[pageSize]", "1");
            params.set("populate[wallpaper]", "true");
            params.set("populate[cover]", "true");
            params.set("populate[screenshots]", "true");
            params.set("populate[platform][populate][icon]", "true");

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${params.toString()}`;
            // console.log("URL GET BY SLUG:", url);

            const response = await fetch(url, {
                next: {
                    revalidate: 60,
                    tags: [`game:${normalizedSlug}`],
                },
            });

            const result = await response.json().catch(() => null);
            // console.log("RESPUESTA GET BY SLUG:", result);

            if (!response.ok) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    `Error HTTP ${response.status}`;

                throw new Error(message);
            }

            return result?.data?.[0] ?? null;
        } catch (error) {
            throw new Error(`Error al obtener el juego: ${error.message}`);
        }
    }

    async getGameByDocumentId(documentId) {
        try {
            const params = new URLSearchParams();

            params.set("populate[0]", "cover");
            params.set("populate[1]", "platform");

            const url =
                `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}` +
                `/${encodeURIComponent(documentId)}` +
                `?${params.toString()}`;

            const response = await fetch(url, {
                cache: "no-store",
            });

            const result = await response.json().catch(() => null);

            if (!response.ok) {
                const message =
                    result?.error?.message ||
                    result?.message ||
                    `Error HTTP ${response.status}`;

                throw new Error(message);
            }

            return result?.data ?? null;
        } catch (error) {
            throw new Error(
                `Error al obtener el juego del carrito: ${error.message}`,
            );
        }
    }
}
