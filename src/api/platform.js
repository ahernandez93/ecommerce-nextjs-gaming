import { ENV } from "@/lib/constants";

export class Platform {
    async getAll() {
        try {
            const sort = "sort=order:asc";
            const populate = "populate=icon";

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORMS}?${sort}&${populate}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al obtener plataformas");
            }

            return data;
        } catch (error) {
            throw new Error(`Error obteniendo plataformas: ${error.message}`);
        }
    }
}
