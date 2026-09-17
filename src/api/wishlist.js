import { ENV, authFetch } from "@/lib";

async function parseResponse(response) {
    if (response.status === 204) {
        return null;
    }

    return response.json().catch(() => null);
}

function createResponseError(response, result) {
    const message =
        result?.error?.message ||
        result?.message ||
        `Error HTTP ${response.status}`;

    return new Error(message);
}

export class Wishlist {
    async check(userId, gameDocumentId) {
        const params = new URLSearchParams();

        params.set("filters[user][id][$eq]", String(userId));
        params.set("filters[game][documentId][$eq]", gameDocumentId);
        params.set("pagination[pageSize]", "1");

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLISTS}?${params.toString()}`;

        const response = await authFetch(url);
        const result = await parseResponse(response);

        if (!response.ok) {
            throw createResponseError(response, result);
        }

        return result?.data?.[0] ?? null;
    }

    async add(userId, gameDocumentId) {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLISTS}`;

        const response = await authFetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    user: userId,
                    game: gameDocumentId,
                },
            }),
        });

        const result = await parseResponse(response);

        if (!response.ok) {
            throw createResponseError(response, result);
        }

        return result?.data ?? null;
    }

    async delete(wishlistDocumentId) {
        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLISTS}/${wishlistDocumentId}`;

        const response = await authFetch(url, {
            method: "DELETE",
        });

        const result = await parseResponse(response);

        if (!response.ok) {
            throw createResponseError(response, result);
        }

        return result;
    }

    async getAll(userId) {
        const params = new URLSearchParams();

        params.set("filters[user][id][$eq]", String(userId));
        params.set("populate[game][populate][cover]", "true");

        const url = `${ENV.API_URL}/${ENV.ENDPOINTS.WISHLISTS}?${params.toString()}`;

        const response = await authFetch(url);
        const result = await parseResponse(response);

        if (!response.ok) {
            throw createResponseError(response, result);
        }

        return result?.data ?? [];
    }
}
