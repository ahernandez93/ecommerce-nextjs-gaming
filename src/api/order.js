import { ENV, authFetch } from "@/lib";

export class Order {
    async getAll(userId) {
        try {
            const params = new URLSearchParams();

            params.set("filters[user][id][$eq]", String(userId));
            params.set("sort[0]", "createdAt:desc");

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDERS}?${params.toString()}`;

            const response = await authFetch(url);

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
            throw new Error(`Error al obtener los pedidos: ${error.message}`);
        }
    }
}
