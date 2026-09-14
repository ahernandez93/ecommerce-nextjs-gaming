"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { Address as AddressCtrl } from "@/api";
import { BasicModal, Confirm } from "@/components/Shared";
import { Button } from "@/components/ui/button";

import { AddressForm } from "../../AddressForm";

const addressCtrl = new AddressCtrl();

export function Address({ addressId, address, onReload }) {
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        try {
            await addressCtrl.delete(addressId);

            setShowConfirm(false);
            onReload?.();
        } catch (error) {
            console.error("No se pudo eliminar la dirección:", error);
            throw error;
        }
    };

    return (
        <>
            <article className="flex items-center justify-between gap-5 rounded-[10px] bg-[#343434] px-5 py-4">
                <div className="flex min-w-0 flex-wrap items-center">
                    <h3 className="mr-1 font-bold text-white">
                        {address.title}:
                    </h3>

                    <p className="text-[#999999]">
                        {address.name}, {address.address}, {address.state},{" "}
                        {address.city}, {address.postal_code}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                    <Button
                        type="button"
                        size="icon"
                        onClick={() => setShowEdit(true)}
                        aria-label={`Editar dirección ${address.title}`}
                        className="size-10 rounded-md p-0"
                    >
                        <Pencil
                            className="size-[17px]"
                            strokeWidth={2.5}
                            aria-hidden="true"
                        />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        onClick={() => setShowConfirm(true)}
                        aria-label={`Eliminar dirección ${address.title}`}
                        className="size-10 rounded-md p-0"
                    >
                        <Trash2
                            className="size-[19px]"
                            strokeWidth={3}
                            aria-hidden="true"
                        />
                    </Button>
                </div>
            </article>

            <Confirm
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleDelete}
                title="Eliminar dirección"
                content="¿Estás seguro de que quieres eliminar esta dirección?"
            />

            <BasicModal
                show={showEdit}
                onClose={() => setShowEdit(false)}
                title="Editar dirección"
            >
                <AddressForm
                    addressId={addressId}
                    address={address}
                    onReload={onReload}
                    onClose={() => setShowEdit(false)}
                />
            </BasicModal>
        </>
    );
}
