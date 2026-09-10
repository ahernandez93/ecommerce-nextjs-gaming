import { Token } from "@/api/token";

export async function authFetch(url, params) {
    const tokenCtrl = new Token();
    const token = tokenCtrl.getToken();

    const logOut = () => {
        tokenCtrl.removeToken();
        window.location.replace = ("/");
    };

    if (!token) {
        logOut();
        throw new Error(
            "No se encontró un token de acceso. Por favor, inicia sesión.",
        );
    } else {
        const hasExpired = tokenCtrl.hasExpired(token);
        if (hasExpired) {
            logOut();
            throw new Error(
                "El token de acceso ha expirado. Por favor, inicia sesión nuevamente.",
            );
        }

        const paramsTemp = {
            ...params,
            headers: {
                ...params?.headers,
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            return await fetch(url, paramsTemp);
        } catch (error) {
            throw new Error(
                "Error al realizar la solicitud autenticada: " + error.message,
            );
        }
    }
}
