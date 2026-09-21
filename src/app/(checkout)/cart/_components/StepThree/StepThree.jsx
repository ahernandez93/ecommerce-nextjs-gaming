import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StepThree() {
    return (
        <section className="flex flex-col items-center">
            <CircleCheck
                aria-hidden="true"
                strokeWidth={2}
                className="size-[70px] text-[#69af00]"
            />

            <h2 className="mb-5 text-2xl font-bold">¡Compra exitosa!</h2>

            <Button asChild className="h-[46px] w-[300px]">
                <Link href="/account">Ver pedido</Link>
            </Button>
        </section>
    );
}
