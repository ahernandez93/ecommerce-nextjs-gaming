import { Geist } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

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
        <html
            lang="es"
            className={`${geistSans.variable} dark`}
        >
            <body className="min-h-svh font-sans antialiased">
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
