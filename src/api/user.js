import { ENV } from "@/lib/constants";
import { authFetch } from "@/lib/authFetch";

export class User {
    async getMe() {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;
            const response = await authFetch(url);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw new Error(
                "Error al obtener la información del usuario: " + error.message,
            );
        }
    }
}
