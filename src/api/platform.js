import { ENV } from "@/lib";

export class Platform {
    async getAll() {
        try {
            const params = new URLSearchParams({
                "sort[0]": "order:asc",
                populate: "*",
            });

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORMS}?${params.toString()}`;

            const response = await fetch(url, {
                next: {
                    revalidate: 3600,
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
                `Error al obtener las plataformas: ${error.message}`,
            );
        }
    }
    
    async getBySlug(slug) {
        try {
            const params = new URLSearchParams({
                "filters[slug][$eq]": slug,
                "pagination[pageSize]": "1",
            });

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PLATFORMS}?${params.toString()}`;

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

            return result?.data?.[0] ?? null;
        } catch (error) {
            throw new Error(`Error al obtener la plataforma: ${error.message}`);
        }
    }
}
