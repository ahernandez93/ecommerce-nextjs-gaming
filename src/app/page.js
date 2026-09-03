import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
    return (
        <main className="flex min-h-screen items-center justify-center p-6">
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
