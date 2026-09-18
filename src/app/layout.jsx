import { AuthProvider, CartProvider } from "@/contexts";
import { Geist } from "next/font/google";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata = {
    title: "Ecommerce Gaming",
    description: "Tienda online de videojuegos",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es" className={`${geistSans.variable} dark`}>
            <body className="min-h-svh font-sans antialiased">
                <AuthProvider>
                    <CartProvider>{children}</CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
