import { ENV } from "@/lib";

export class Game {
    async getLastPublished() {
        try {
            const sort = "sort=publishedAt:desc";
            const pagination = "pagination[limit]=1";
            const populate = "populate=*";
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.GAMES}?${populate}&${sort}&${pagination}`;

            const response = await fetch(url);
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
                `Error al obtener el ultimo juego publicado: ${error.message}`,
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

            const response = await fetch(url);
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
                `Error al obtener los ultimos juegos publicados: ${error.message}`,
            );
        }
    }
}
