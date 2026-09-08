"use client";

import { useEffect } from "react";
import { LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Info } from "./_components/Info";

export default function AccountPage() {
    const router = useRouter();
    const { user, logout } = useAuth();

    /* useEffect(() => {
        if (!loading && !user) {
            router.replace("/");
        }
    }, [loading, user, router]); */

    if (!user) {
        router.push("/");
        return null;
    }

    function handleLogout() {
        logout();
        router.replace("/");
    }

    /* if (loading || !user) {
        return null;
    } */

    return (
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <Info user={user} />

            <Tabs defaultValue="orders" className="mt-[50px]">
                <div className="flex items-center border-b border-border">
                    <TabsList className="h-auto min-w-0 flex-1 justify-start rounded-none bg-transparent p-0">
                        <TabsTrigger
                            value="orders"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Mis pedidos
                        </TabsTrigger>

                        <TabsTrigger
                            value="wishlist"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Lista de deseos
                        </TabsTrigger>

                        <TabsTrigger
                            value="addresses"
                            className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Direcciones
                        </TabsTrigger>

                        <TabsTrigger
                            value="settings"
                            aria-label="Ajustes"
                            className="ml-auto gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            <Settings className="size-4" />
                            <span className="hidden sm:inline">Ajustes</span>
                        </TabsTrigger>
                    </TabsList>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleLogout}
                        aria-label="Cerrar sesión"
                        className="ml-1 shrink-0 rounded-none hover:bg-transparent hover:text-primary dark:hover:bg-transparent"
                    >
                        <LogOut className="size-4" />
                    </Button>
                </div>

                <TabsContent
                    value="orders"
                    className="mt-6 rounded-lg border border-border bg-card p-6"
                >
                    <p>Mis pedidos</p>
                </TabsContent>

                <TabsContent
                    value="wishlist"
                    className="mt-6 rounded-lg border border-border bg-card p-6"
                >
                    <p>Mi lista de deseos</p>
                </TabsContent>

                <TabsContent
                    value="addresses"
                    className="mt-6 rounded-lg border border-border bg-card p-6"
                >
                    <p>Mis direcciones</p>
                </TabsContent>

                <TabsContent
                    value="settings"
                    className="mt-6 rounded-lg border border-border bg-card p-6"
                >
                    <p>Ajustes</p>
                </TabsContent>
            </Tabs>
        </div>
    );
}
