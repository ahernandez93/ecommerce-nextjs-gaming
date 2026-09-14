"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { BasicModal } from "@/components/Shared";
import { Button } from "@/components/ui/button";

import { AddressForm } from "../AddressForm";

export function AddAddress({ onReload }) {
    const [show, setShow] = useState(false);

    function openModal() {
        setShow(true);
    }

    function closeModal() {
        setShow(false);
    }

    return (
        <>
            <div className="mb-6 flex justify-end">
                <Button type="button" onClick={openModal} className="gap-2">
                    <Plus className="size-4" />
                    Crear
                </Button>
            </div>

            <BasicModal
                show={show}
                onClose={closeModal}
                title="Nueva dirección"
                description="Completa la información de la nueva dirección."
            >
                <AddressForm onClose={closeModal} onReload={onReload} />
            </BasicModal>
        </>
    );
}
