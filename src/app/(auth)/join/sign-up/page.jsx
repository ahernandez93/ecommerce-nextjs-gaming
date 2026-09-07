import Link from "next/link";

import { RegisterForm } from "./_components/RegisterForm";

export const metadata = {
    title: "Crear cuenta",
};

export default function SignUpPage() {
    return (
        <section className="w-full max-w-sm">
            <h1 className="mb-5 text-2xl font-semibold">Crear cuenta</h1>

            <RegisterForm />

            <div className="mt-4 text-center">
                <Link
                    href="/join/sign-in"
                    className="text-sm text-muted-foreground hover:text-primary"
                >
                    ¿Ya tienes una cuenta? Inicia sesión
                </Link>
            </div>
        </section>
    );
}
