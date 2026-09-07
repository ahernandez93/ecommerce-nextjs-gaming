import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
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
            className={`${geistSans.variable} ${geistMono.variable} dark`}
        >
            <body className="h-full antialiased">
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
