"use client";

import Image from "next/image";
import { DateTime } from "luxon";
import { fn } from "@/lib";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export function Order({ order }) {
    const products = order.products ?? [];
    const address = order.addressShipping;
    const totalPayment = Number(order.totalPayment ?? 0);

    const formattedDate = order.createdAt
        ? DateTime.fromISO(order.createdAt)
              .setLocale("es")
              .toFormat("dd/MM/yyyy")
        : "";

    const totalProducts = products.reduce(
        (total, product) => total + Number(product.quantity ?? 0),
        0,
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    type="button"
                    className="
                        flex w-full items-center justify-between
                        rounded-[15px] border-2 border-transparent
                        bg-[#333333] p-5 text-left
                        transition-colors hover:border-primary
                    "
                >
                    <span className="flex flex-col">
                        <span className="text-xs text-[#8a8a8a]">
                            {formattedDate}
                        </span>

                        <span>
                            {totalProducts}{" "}
                            {totalProducts === 1 ? "producto" : "productos"}
                        </span>
                    </span>

                    <span className="text-xl font-bold">
                        {priceFormatter.format(totalPayment)}
                    </span>
                </button>
            </DialogTrigger>

            <DialogContent
                className="
                    max-h-[85vh] gap-0 overflow-y-auto
                    rounded-[15px] border-0 bg-[#222222]
                    p-[30px] text-white
                    sm:max-w-[760px]
                "
            >
                <DialogTitle className="mb-[30px] bg-transparent p-0 text-left text-xl font-bold">
                    Información del pedido
                </DialogTitle>

                <div>
                    {products.map((product, index) => {
                        const price = fn.calcDiscountedPrice(
                            product.price,
                            product.discount,
                        );

                        return (
                            <div
                                key={
                                    product.documentId ??
                                    `${product.title}-${index}`
                                }
                                className="
                                    mb-5 flex border-b
                                    border-[#444444] pb-5
                                "
                            >
                                {product.cover?.url && (
                                    <Image
                                        src={product.cover.url}
                                        alt={`Portada de ${product.title}`}
                                        width={100}
                                        height={56}
                                        sizes="100px"
                                        className="
                                            mr-5 h-auto
                                            w-[100px] shrink-0
                                            rounded-lg object-cover
                                        "
                                    />
                                )}

                                <div className="flex min-w-0 w-full">
                                    <div className="flex w-full flex-col justify-center py-[10px]">
                                        <p className="font-bold">
                                            {product.title}
                                        </p>

                                        <p className="text-xs text-[#8a8a8a]">
                                            {product.platform?.title}
                                        </p>
                                    </div>

                                    <div className="flex shrink-0 items-center">
                                        <span className="ml-[10px] font-bold">
                                            x{product.quantity}
                                        </span>

                                        <span className="ml-[10px] font-bold">
                                            {priceFormatter.format(
                                                Number(price),
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {address && (
                        <div
                            className="
                                mb-5 rounded-[10px] border-b
                                border-[#444444] bg-[#333333]
                                p-5
                            "
                        >
                            <p className="text-base font-bold">
                                {address.title}
                            </p>

                            <p className="text-base text-[#8a8a8a]">
                                {address.name}, {address.address},{" "}
                                {address.city}, {address.state},{" "}
                                {address.postal_code}
                            </p>
                        </div>
                    )}

                    <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                            TOTAL: {priceFormatter.format(totalPayment)}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
