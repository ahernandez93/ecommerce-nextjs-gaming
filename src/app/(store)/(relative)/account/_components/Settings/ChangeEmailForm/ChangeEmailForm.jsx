"use client";

import { useFormik } from "formik";
import { Loader2 } from "lucide-react";

import { User } from "@/api";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { initialValues, validationSchema } from "../ChangeEmailForm/ChangeEmailForm.form";

const userCtrl = new User();

export function ChangeEmailForm() {
    const { user, updateUser } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,

        onSubmit: async (formValue) => {
            try {
                const email = formValue.email.trim().toLowerCase();

                await userCtrl.updateMe(user.id, {
                    email,
                });

                updateUser({ email });
                formik.resetForm();
            } catch (error) {
                console.error(error);
            }
        },
    });

    const emailError = formik.touched.email && formik.errors.email;
    const repeatEmailError =
        formik.touched.repeatEmail && formik.errors.repeatEmail;

    return (
        <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="w-full space-y-4"
        >
            <p className="text-sm font-medium">Cambiar correo electrónico</p>

            <div className="space-y-1.5">
                <Label htmlFor="email" className="sr-only">
                    Nuevo correo electrónico
                </Label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nuevo correo electrónico"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? "email-error" : undefined}
                />

                {emailError && (
                    <p id="email-error" className="text-sm text-destructive">
                        {emailError}
                    </p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="repeatEmail" className="sr-only">
                    Repetir correo electrónico
                </Label>

                <Input
                    id="repeatEmail"
                    name="repeatEmail"
                    type="email"
                    placeholder="Repetir correo electrónico"
                    value={formik.values.repeatEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(repeatEmailError)}
                    aria-describedby={
                        repeatEmailError ? "repeat-email-error" : undefined
                    }
                />

                {repeatEmailError && (
                    <p
                        id="repeat-email-error"
                        className="text-sm text-destructive"
                    >
                        {repeatEmailError}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting && (
                    <Loader2 className="animate-spin" aria-hidden="true" />
                )}
                Enviar
            </Button>
        </form>
    );
}
