"use client";

import { useEffect, useState } from "react";
import { Address } from "@/api";
import { useAuth } from "@/hooks";

const addressCtrl = new Address();

export function Addresses({ addressSelected, setAddressSelected }) {
    const { user } = useAuth();
    const [addresses, setAddresses] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function loadAddresses() {
            try {
                const response = await addressCtrl.getAll(user?.id);

                if (!cancelled) {
                    setAddresses(response.data ?? []);
                }
            } catch (error) {
                if (!cancelled) {
                    console.error(
                        "No se pudieron cargar las direcciones:",
                        error,
                    );

                    setAddresses([]);
                }
            }
        }

        loadAddresses();

        return () => {
            cancelled = true;
        };
    }, [user?.id]);

    if (addresses === null) {
        return null;
    }

    return (
        <section>
            <h2 className="mb-[15px] text-[18px] font-bold">Dirección</h2>

            {addresses.map((address) => {
                const addressId = address.documentId ?? address.id;

                const selectedId =
                    addressSelected?.documentId ?? addressSelected?.id;

                const isSelected = addressId === selectedId;

                return (
                    <button
                        key={addressId}
                        type="button"
                        onClick={() => setAddressSelected(address)}
                        className={`mb-[10px] flex w-full flex-col rounded-[15px] border-2 p-5 text-left transition-colors ${
                            isSelected
                                ? "border-primary"
                                : "border-[#3d3d3d] hover:border-primary"
                        }`}
                    >
                        <span>
                            {address.name} ({address.title})
                        </span>

                        <span className="text-[#8a8a8a]">
                            {address.address}, {address.postal_code},{" "}
                            {address.city}, {address.state}
                        </span>
                    </button>
                );
            })}
        </section>
    );
}
