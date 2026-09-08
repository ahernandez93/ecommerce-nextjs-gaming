"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
    const { user, logout } = useAuth();

    return (
        <main className="flex min-h-screen items-center justify-center p-6">
            {user ? (
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-bold">
                        Bienvenido, {user.username}!
                    </h1>
                    <button
                        onClick={logout}
                        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-bold">Bienvenido a Gaming!</h1>
                    <p>Por favor, inicia sesión o regístrate para continuar.</p>
                    <div className="flex gap-4">
                        <a
                            href="/join/sign-in"
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Iniciar sesión
                        </a>
                        <a
                            href="/join/sign-up"
                            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                        >
                            Registrarse
                        </a>
                    </div>
                </div>
            )}
            <Tabs defaultValue="description" className="w-full max-w-lg">
                <TabsList>
                    <TabsTrigger value="description">Descripción</TabsTrigger>

                    <TabsTrigger value="details">Detalles</TabsTrigger>

                    <TabsTrigger value="reviews">Opiniones</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                    Descripción general del videojuego.
                </TabsContent>

                <TabsContent value="details">
                    Plataforma, desarrollador y fecha de lanzamiento.
                </TabsContent>

                <TabsContent value="reviews">
                    Opiniones publicadas por los compradores.
                </TabsContent>
            </Tabs>
        </main>
    );
}
