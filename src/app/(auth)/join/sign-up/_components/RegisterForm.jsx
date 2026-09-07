"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { initialValues, validationSchema } from "./RegisterForm.form";
import { Auth } from "@/api/auth";

const authCtrl = new Auth();

export function RegisterForm() {
    const router = useRouter();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        validateOnBlur: true,

        onSubmit: async (formValues) => {
            try {
                await authCtrl.register(formValues);
                router.push("/join/sign-in");
            } catch (error) {
                console.log(error);
            }
        },
    });

    const emailError = formik.touched.email && formik.errors.email;
    const usernameError = formik.touched.username && formik.errors.username;
    const firstNameError = formik.touched.firstName && formik.errors.firstName;
    const passwordError = formik.touched.password && formik.errors.password;

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-4" noValidate>
            {/* <div className="grid gap-4 sm:grid-cols-2"> */}
            <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>

                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(emailError)}
                    aria-describedby={emailError ? "email-error" : undefined}
                />

                {emailError && (
                    <p id="email-error" className="text-sm text-destructive">
                        {formik.errors.email}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="username">Nombre de usuario</Label>

                <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Nombre de usuario"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={Boolean(usernameError)}
                    aria-describedby={
                        usernameError ? "username-error" : undefined
                    }
                />

                {usernameError && (
                    <p id="username-error" className="text-sm text-destructive">
                        {formik.errors.username}
                    </p>
                )}
            </div>
            {/* </div> */}

            {/* <div className="grid gap-4 sm:grid-cols-2"> */}
            {/* <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre y apellidos</Label>

                    <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Nombre y apellidos"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        aria-invalid={Boolean(firstNameError)}
                        aria-describedby={
                            firstNameError ? "firstname-error" : undefined
                        }
                    />

                    {firstNameError && (
                        <p
                            id="firstname-error"
                            className="text-sm text-destructive"
                        >
                            {formik.errors.firstName}
                        </p>
                    )}
                </div> */}

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
            {/* </div> */}

            <Button
                type="submit"
                className="w-full"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
        </form>
    );
}
