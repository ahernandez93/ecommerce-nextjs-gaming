"use client";

import { ShoppingCart, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export function Account() {
    const router = useRouter();
    const { user } = useAuth();
    const total = 5; // Replace with the actual total number of products in the cart 

    const goToLogin = () => {
        router.push("/join/sign-in");
    };

    const goToAccount = () => {
        router.push("/account");
    };

    const goToCart = () => {
        if (!user) {
            goToLogin();
            return;
        }

        router.push("/cart");
    };

    return (
        <div className="flex shrink-0 items-center gap-3">
            <Button
                type="button"
                variant="ghost"
                onClick={goToCart}
                aria-label={`Abrir carrito con ${total} productos`}
                className="h-11 gap-2 rounded-lg px-2 hover:bg-transparent hover:text-primary"
            >
                <ShoppingCart className="size-5" />

                {total > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none text-primary-foreground">
                        {total > 99 ? "99+" : total}
                    </span>
                )}
            </Button>

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={user ? goToAccount : goToLogin}
                aria-label={user ? "Abrir mi cuenta" : "Iniciar sesión"}
                className={
                    user
                        ? "size-11 rounded-[10px] border-2 border-surface-deep bg-surface-deep hover:border-primary hover:bg-surface-deep hover:text-foreground"
                        : "size-11 rounded-[10px] hover:bg-surface-deep hover:text-primary"
                }
            >
                <UserRound className="size-5" />
            </Button>
        </div>
    );
}
