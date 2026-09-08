import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";

export default function StoreLayout({ children }) {
    return (
        <div className="flex min-h-svh flex-col">
            <TopBar />

            <main className="flex-1 pt-24">{children}</main>

            <Footer />
        </div>
    );
}
