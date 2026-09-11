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

            const response = await authFetch(url, params);
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
            throw new Error(`Error creando dirección: ${error.message}`);
        }
    }

    async getAll(userId) {
        try {
            const filters = `filters[user][id][$eq]=${userId}`;
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}?${filters}`;

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
            throw new Error(
                `Error obteniendo las direcciones: ${error.message}`,
            );
        }
    }

    async update(data, addressId) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
            const params = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ data }),
            };

            const response = await authFetch(url, params);
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
            throw new Error(`Error actualizando dirección: ${error.message}`);
        }
    }

    async delete(addressId) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ADDRESSES}/${addressId}`;
            const params = {
                method: "DELETE",
            };

            const response = await authFetch(url, params);
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
            throw new Error(`Error eliminando dirección: ${error.message}`);
        }
    }
}
