"use client";

import { createContext, useEffect, useState } from "react";

import { Cart } from "@/api";

const cartCtrl = new Cart();

export const CartContext = createContext(undefined);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    function refreshTotalCart(currentCart = cartCtrl.getAll()) {
        setCart(currentCart);
        setTotal(cartCtrl.count(currentCart));
    }

    /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
    useEffect(() => {
        refreshTotalCart();
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

    function addCart(gameDocumentId) {
        const updatedCart = cartCtrl.add(gameDocumentId);

        refreshTotalCart(updatedCart);
    }

    function changeQuantityItem(gameDocumentId, quantity) {
        const updatedCart = cartCtrl.changeQuantity(gameDocumentId, quantity);

        refreshTotalCart(updatedCart);
    }

    function deleteItem(gameDocumentId) {
        const updatedCart = cartCtrl.delete(gameDocumentId);

        refreshTotalCart(updatedCart);
    }

    function deleteAllItems() {
        const updatedCart = cartCtrl.deleteAll();

        refreshTotalCart(updatedCart);
    }

    const value = {
        cart,
        total,
        addCart,
        deleteItem,
        deleteAllItems,
        changeQuantityItem,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
