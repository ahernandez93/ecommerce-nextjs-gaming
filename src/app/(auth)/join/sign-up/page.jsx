import Link from "next/link";

import { RegisterForm } from "./_components/register-form";

export const metadata = {
    title: "Crear cuenta",
};

export default function SignUpPage() {
    return (
        // <div className="w-full max-w-xl lg:w-[70%]">
        //     <h1 className="mb-5 text-2xl font-bold">Crear cuenta</h1>

        //     <RegisterForm />

        //     <div className="mt-2.5 text-center">
        //         <Link href="/join/sign-in">Atrás</Link>
        //     </div>
        // </div>

        <section className="w-full max-w-xl">
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
