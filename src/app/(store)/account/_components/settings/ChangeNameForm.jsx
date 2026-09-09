"use client";

import { useFormik } from "formik";
import { Loader2 } from "lucide-react";

import { User } from "@/api";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { initialValues, validationSchema } from "./ChangeNameForm.form";

const userCtrl = new User();

export function ChangeNameForm() {
    const { user, updateUser } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(user.firstName, user.lastName),
        validationSchema: validationSchema(),
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: async (formValue) => {
            try {
                const data = {
                    firstName: formValue.firstname.trim(),
                    lastName: formValue.lastname.trim(),
                };

                await userCtrl.updateMe(user.id, data);
                updateUser(data);
            } catch (error) {
                console.error(error);
            }
        },
    });

    const firstnameError = formik.touched.firstname && formik.errors.firstname;
    const lastnameError = formik.touched.lastname && formik.errors.lastname;

    return (
        <form onSubmit={formik.handleSubmit} noValidate className="space-y-3">
            <p className="text-sm font-medium">Nombre y apellidos</p>

            <div className="grid items-start gap-4 sm:grid-cols-[1fr_1fr_auto]">
                <div className="space-y-1.5">
                    <Label htmlFor="firstname" className="sr-only">
                        Nombre
                    </Label>

                    <Input
                        id="firstname"
                        name="firstname"
                        placeholder="Nombre"
                        autoComplete="given-name"
                        value={formik.values.firstname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-invalid={Boolean(firstnameError)}
                        aria-describedby={
                            firstnameError ? "firstname-error" : undefined
                        }
                    />

                    {firstnameError && (
                        <p
                            id="firstname-error"
                            className="text-sm text-destructive"
                        >
                            {firstnameError}
                        </p>
                    )}
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="lastname" className="sr-only">
                        Apellido
                    </Label>

                    <Input
                        id="lastname"
                        name="lastname"
                        placeholder="Apellidos"
                        autoComplete="family-name"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-invalid={Boolean(lastnameError)}
                        aria-describedby={
                            lastnameError ? "lastname-error" : undefined
                        }
                    />

                    {lastnameError && (
                        <p
                            id="lastname-error"
                            className="text-sm text-destructive"
                        >
                            {lastnameError}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="sm:min-w-24"
                >
                    {formik.isSubmitting && (
                        <Loader2 className="animate-spin" aria-hidden="true" />
                    )}
                    Enviar
                </Button>
            </div>
        </form>
    );
}
