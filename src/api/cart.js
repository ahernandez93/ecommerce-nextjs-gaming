import { ENV } from "@/lib";

export class Cart {
    add(gameDocumentId) {
        if (!gameDocumentId) {
            return this.getAll();
        }

        const games = this.getAll();

        const gameIndex = games.findIndex(
            (game) => game.documentId === gameDocumentId,
        );

        if (gameIndex === -1) {
            games.push({
                documentId: gameDocumentId,
                quantity: 1,
            });
        } else {
            games[gameIndex].quantity += 1;
        }

        localStorage.setItem(ENV.STORAGE_KEYS.CART, JSON.stringify(games));

        return games;
    }

    getAll() {
        if (typeof window === "undefined") {
            return [];
        }

        const storedCart = localStorage.getItem(ENV.STORAGE_KEYS.CART);

        if (!storedCart) {
            return [];
        }

        try {
            const cart = JSON.parse(storedCart);

            return Array.isArray(cart) ? cart : [];
        } catch (error) {
            console.error("No se pudo leer el carrito:", error);
            return [];
        }
    }

    count(games = this.getAll()) {
        return games.reduce(
            (total, game) => total + Number(game.quantity || 0),
            0,
        );
    }

    changeQuantity(gameDocumentId, quantity) {
        const games = this.getAll();

        const updatedGames = games.map((game) =>
            game.documentId === gameDocumentId
                ? {
                      ...game,
                      quantity: Number(quantity),
                  }
                : game,
        );

        localStorage.setItem(ENV.CART, JSON.stringify(updatedGames));

        return updatedGames;
    }

    delete(gameDocumentId) {
        const games = this.getAll();

        const updatedGames = games.filter(
            (game) => game.documentId !== gameDocumentId,
        );

        localStorage.setItem(ENV.CART, JSON.stringify(updatedGames));

        return updatedGames;
    }

    deleteAll() {
        localStorage.removeItem(ENV.CART);

        return [];
    }
}
