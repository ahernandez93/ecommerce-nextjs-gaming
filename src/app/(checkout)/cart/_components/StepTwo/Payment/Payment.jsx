"use client";

import { CardElement } from "@stripe/react-stripe-js";

const cardOptions = {
    style: {
        base: {
            color: "#ffffff",
            fontSize: "16px",
            "::placeholder": {
                color: "#909090",
            },
        },
        invalid: {
            color: "#ff5400",
        },
    },
};

export function Payment() {
    return (
        <section>
            <h2 className="mb-[15px] text-[18px] font-bold">Métodos de pago</h2>

            <div className="w-full rounded-[15px] bg-[#333333] p-5">
                <CardElement options={cardOptions} />
            </div>
        </section>
    );
}
