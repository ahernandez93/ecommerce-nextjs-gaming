import { ENV } from "@/lib";

export class Auth {
    async register(data) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url, params);
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const message =
                    errorData?.error?.message ||
                    errorData?.message ||
                    `Error HTTP ${response.status}`;
                throw new Error(message);
            }
            return await response.json();
        } catch (error) {
            throw new Error("Error al registrar el usuario: " + error.message);
        }
    }
}
