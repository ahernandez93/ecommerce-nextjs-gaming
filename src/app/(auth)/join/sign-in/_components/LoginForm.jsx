"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Auth } from "@/api/auth";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialValues, validationSchema } from "./LoginForm.form";

const authCtrl = new Auth();

export function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        validateOnBlur: true,

        onSubmit: async (formValue) => {
            try {
                const response = await authCtrl.login(formValue);
                login(response.jwt);
                router.push("/");
            } catch (error) {
                console.error(error);
            }
        },
    });

    const identifierError =
        formik.touched.identifier && formik.errors.identifier;
    const passwordError = formik.touched.password && formik.errors.password;

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
                <Label htmlFor="identifier">
                    Correo electrónico o nombre de usuario
                </Label>

                <Input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="Correo electrónico o nombre de usuario"
                    value={formik.values.identifier}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(identifierError)}
                    aria-describedby={
                        identifierError ? "identifier-error" : undefined
                    }
                />

                {identifierError && (
                    <p
                        id="identifier-error"
                        className="text-sm text-destructive"
                    >
                        {formik.errors.identifier}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>

                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(passwordError)}
                    aria-describedby={
                        passwordError ? "password-error" : undefined
                    }
                />

                {passwordError && (
                    <p id="password-error" className="text-sm text-destructive">
                        {formik.errors.password}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting && (
                    <Loader2 className="animate-spin" aria-hidden="true" />
                )}

                {formik.isSubmitting ? "Iniciando sesión..." : "Entrar"}
            </Button>
        </form>
    );
}
