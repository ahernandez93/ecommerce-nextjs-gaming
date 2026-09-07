import Link from "next/link";
import { LoginForm } from "./_components/LoginForn";

export const metadata = {
    title: "Iniciar sesión",
    description: "Inicia sesión en Ecommerce Gaming",
};

export default function SignInPage() {
    return (
        <section className="w-full max-w-sm">
            <h1 className="mb-5 text-2xl font-semibold">Iniciar sesión</h1>

            <LoginForm />

            <div className="mt-4 text-center">
                <Link
                    href="/join/sign-up"
                    className="text-sm text-muted-foreground hover:text-primary"
                >
                    ¿No tienes una cuenta?
                </Link>
            </div>
        </section>
    );
}
