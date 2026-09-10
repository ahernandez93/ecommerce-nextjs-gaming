import { ENV, authFetch } from "@/lib";

export class Address {
    async create(data, userId) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        ...data,
                        user: userId,
                    },
                }),
            };
            console.log({
                data: {
                    ...data,
                    user: userId,
                },
            });

            const response = await authFetch(url, params);
            const result = await response.json();

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const message =
                    errorData?.error?.message ||
                    errorData?.message ||
                    `Error HTTP ${response.status}`;
                throw new Error(message);
            }

            return result;
        } catch (error) {
            throw new Error(`Error creando direccion: ${error.message}`);
        }
    }

    async getAll(userId) {
        try {
            const filters = `filters[user][id][$eq]=${userId}`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}?${filters}`;

            const response = await authFetch(url);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al obtener direcciones");
            }

            return result;
        } catch (error) {
            throw new Error(
                `Error obteniendo las direcciones: ${error.message}`,
            );
        }
    }
}
