"use client";

import { createContext, useEffect, useState } from "react";

import { Cart } from "@/api";

const cartCtrl = new Cart();

export const CartContext = createContext(undefined);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Al montar el provider, sincronizamos el estado con localStorage.
    /* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
        const storedCart = cartCtrl.getAll();

        setCart(storedCart);
        setTotal(cartCtrl.count(storedCart));
    }, []);
    /* eslint-enable react-hooks/set-state-in-effect */

    function addCart(gameDocumentId) {
        const updatedCart = cartCtrl.add(gameDocumentId);

        setCart(updatedCart);
        setTotal(cartCtrl.count(updatedCart));
    }

    function refreshCart() {
        const storedCart = cartCtrl.getAll();

        setCart(storedCart);
        setTotal(cartCtrl.count(storedCart));
    }

    function changeQuantityItem(gameDocumentId, quantity) {
        const updatedCart = cartCtrl.changeQuantity(gameDocumentId, quantity);

        setCart(updatedCart);
        setTotal(cartCtrl.count(updatedCart));
    }

    function deleteItem(gameDocumentId) {
        const updatedCart = cartCtrl.delete(gameDocumentId);

        setCart(updatedCart);
        setTotal(cartCtrl.count(updatedCart));
    }

    function deleteAllItems() {
        const updatedCart = cartCtrl.deleteAll();

        setCart(updatedCart);
        setTotal(0);
    }

    const value = {
        cart,
        total,
        addCart,
        changeQuantityItem,
        deleteItem,
        deleteAllItems,
        refreshCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
