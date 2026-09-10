"use client";

import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { User } from "@/api";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { initialValues, validationSchema } from "../CHangePasswordForm/ChangePasswordForm.form";

const userCtrl = new User();

export function ChangePasswordForm() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,

        onSubmit: async (formValue) => {
            try {
                await userCtrl.updateMe(user.id, {
                    password: formValue.password,
                });
                logout();
                // router.replace("/join/sign-in");
            } catch (error) {
                console.error(error);
            }
        },
    });

    // const currentPasswordError =
    //     formik.touched.currentPassword && formik.errors.currentPassword;
    const passwordError = formik.touched.password && formik.errors.password;
    const confirmationError =
        formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation;

    return (
        <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="w-full space-y-4"
        >
            <p className="text-sm font-medium">Cambiar contraseña</p>

            {/* <div className="space-y-1.5">
                <Label htmlFor="currentPassword" className="sr-only">
                    Contraseña actual
                </Label>

                <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder="Contraseña actual"
                    autoComplete="current-password"
                    value={formik.values.currentPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(currentPasswordError)}
                    aria-describedby={
                        currentPasswordError
                            ? "current-password-error"
                            : undefined
                    }
                />

                {currentPasswordError && (
                    <p
                        id="current-password-error"
                        className="text-sm text-destructive"
                    >
                        {currentPasswordError}
                    </p>
                )}
            </div> */}

            <div className="space-y-1.5">
                <Label htmlFor="newPassword" className="sr-only">
                    Nueva contraseña
                </Label>

                <Input
                    id="newPassword"
                    name="password"
                    type="password"
                    placeholder="Nueva contraseña"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(passwordError)}
                    aria-describedby={
                        passwordError ? "new-password-error" : undefined
                    }
                />

                {passwordError && (
                    <p
                        id="new-password-error"
                        className="text-sm text-destructive"
                    >
                        {passwordError}
                    </p>
                )}
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="passwordConfirmation" className="sr-only">
                    Repetir nueva contraseña
                </Label>

                <Input
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Repetir nueva contraseña"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(confirmationError)}
                    aria-describedby={
                        confirmationError
                            ? "password-confirmation-error"
                            : undefined
                    }
                />

                {confirmationError && (
                    <p
                        id="password-confirmation-error"
                        className="text-sm text-destructive"
                    >
                        {confirmationError}
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
