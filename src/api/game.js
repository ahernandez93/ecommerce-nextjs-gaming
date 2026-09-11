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
            throw new Error(`Error al obtener los juegos publicados: ${error.message}`);
        }
    }
}