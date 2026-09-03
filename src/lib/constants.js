const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
    throw new Error("Falta configurar NEXT_PUBLIC_STRAPI_URL en .env.local");
}

export const ENV = {
    SERVER_HOST: STRAPI_URL,
    API_URL: `${STRAPI_URL}/api`,

    ENDPOINTS: {
        AUTH: {
            REGISTER: "auth/local/register",
            LOGIN: "auth/local",
        },

        USERS_ME: "users/me",
        USERS: "users",
        PLATFORMS: "platforms",
        ADDRESSES: "addresses",
        GAMES: "games",
        WISHLISTS: "wishlists",
        PAYMENT_ORDER: "payment-order",
        ORDERS: "orders",
    },

    STORAGE_KEYS: {
        TOKEN: "token",
        CART: "cart",
    },

    STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
};
