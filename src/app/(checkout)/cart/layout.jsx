import { Suspense } from "react";
import { Footer, HeaderCart } from "@/components/Layout";
import { Container, Separator } from "@/components/Shared";

export const metadata = {
    title: "Carrito de compra",
    description: "Revisa los videojuegos añadidos a tu carrito.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function CartLayout({ children }) {
    return (
        <div className="flex min-h-svh flex-col">
            <Suspense
                fallback={
                    <div className="fixed inset-x-0 top-0 z-50 h-[77px] border-b border-[#292929] bg-[#0d0d0d]" />
                }
            >
                <HeaderCart />
            </Suspense>

            <main className="flex-1">
                <Separator height={150} />
                <Container>{children}</Container>
                <Separator height={70} />
            </main>

            <Footer />
        </div>
    );
}
