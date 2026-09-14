"use client";

import { useFormik } from "formik";
import { Loader2 } from "lucide-react";

import { Address } from "@/api";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { initialValues, validationSchema } from "./AddressForm.form";

const addressCtrl = new Address();

function AddressField({
    formik,
    name,
    label,
    placeholder,
    type = "text",
    autoComplete,
}) {
    const error = formik.touched[name] && formik.errors[name];

    const errorId = `${name}-error`;

    return (
        <div className="space-y-1.5">
            <Label htmlFor={name} className="sr-only">
                {label}
            </Label>

            <Input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={formik.values[name] ?? ""}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className="h-12 rounded-md bg-background px-4 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 dark:bg-background"
            />

            {error && (
                <p id={errorId} className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    );
}

export function AddressForm({ onClose, onReload, addressId, address }) {
    const { user } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(address),
        validationSchema: validationSchema(),
        validateOnChange: false,
        validateOnBlur: false,
        // enableReinitialize: true,

        onSubmit: async (formValue) => {
            try {
                const data = {
                    title: formValue.title.trim(),
                    name: formValue.name.trim(),
                    address: formValue.address.trim(),
                    state: formValue.state.trim(),
                    city: formValue.city.trim(),
                    postal_code: formValue.postal_code.trim(),
                    phone: formValue.phone.trim(),
                };

                if (addressId) {
                    await addressCtrl.update(data, addressId);
                } else {
                await addressCtrl.create(data, user.id);
                }

                onReload?.();
                onClose?.();
            } catch (error) {
                console.error("No se pudo guardar la dirección:", error);
            }
        },
    });

    return (
        <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="space-y-[15px]"
        >
            <AddressField
                formik={formik}
                name="title"
                label="Título de la dirección"
                placeholder="Título de la dirección"
                autoComplete="off"
            />

            <div className="grid gap-[15px] sm:grid-cols-2">
                <AddressField
                    formik={formik}
                    name="name"
                    label="Nombre y apellidos"
                    placeholder="Nombre y apellidos"
                    autoComplete="name"
                />

                <AddressField
                    formik={formik}
                    name="address"
                    label="Dirección"
                    placeholder="Dirección"
                    autoComplete="street-address"
                />
            </div>

            <div className="grid gap-[15px] sm:grid-cols-2">
                <AddressField
                    formik={formik}
                    name="city"
                    label="Ciudad"
                    placeholder="Ciudad"
                    autoComplete="address-level2"
                />

                <AddressField
                    formik={formik}
                    name="state"
                    label="Provincia o departamento"
                    placeholder="Provincia o departamento"
                    autoComplete="address-level1"
                />
            </div>

            <div className="grid gap-[15px] sm:grid-cols-2">
                <AddressField
                    formik={formik}
                    name="postal_code"
                    label="Código postal"
                    placeholder="Código postal"
                    autoComplete="postal-code"
                />

                <AddressField
                    formik={formik}
                    name="phone"
                    label="Teléfono"
                    placeholder="Teléfono"
                    type="tel"
                    autoComplete="tel"
                />
            </div>

            <Button
                type="submit"
                disabled={formik.isSubmitting}
                className="h-12 w-full rounded-md"
            >
                {formik.isSubmitting && (
                    <Loader2 className="animate-spin" aria-hidden="true" />
                )}

                {formik.isSubmitting ? "Guardando..." : "Enviar"}
            </Button>
        </form>
    );
}
