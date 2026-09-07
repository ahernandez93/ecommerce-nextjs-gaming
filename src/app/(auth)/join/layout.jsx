"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { XIcon } from "lucide-react";

export default function JoinLayout({ children }) {
    const { user } = useAuth();
    const router = useRouter();

    if (user) {
        router.push("/");
    }

    return (
        <div className="relative flex min-h-svh">
            <header className="absolute top-0 left-0 z-10 flex w-full items-center justify-between p-[15px]">
                <Link href="/" aria-label="Ir al inicio">
                    <Image
                        src="/images/logo.png"
                        alt="Gaming"
                        width={150}
                        height={30}
                        priority
                        className="h-[30px] w-auto"
                    />
                </Link>

                <Link
                    href="/"
                    aria-label="Cerrar y volver al inicio"
                    className="text-destructive hover:text-destructive/80"
                >
                    <XIcon className="size-[26px]" />
                </Link>
            </header>

            <section className="flex min-h-svh w-full items-center justify-center px-6 py-20 lg:w-1/2">
                {children}
            </section>

            <div
                aria-hidden="true"
                className="hidden min-h-svh w-1/2 bg-[url('/images/sign-wallpaper.jpg')] bg-cover bg-center lg:block"
            />
        </div>
    );
}
