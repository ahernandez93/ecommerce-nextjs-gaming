"use client";

import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ENV } from "@/lib";
import { Separator } from "@/components/Shared";
import { Addresses } from "./Addresses";
import { Payment } from "./Payment";
import { Resume } from "./Resume";

const stripePromise = loadStripe(ENV.STRIPE_PUBLISHABLE_KEY);

export function StepTwo({ games }) {
    const [addressSelected, setAddressSelected] = useState(null);

    return (
        <Elements stripe={stripePromise}>
            <div className="flex w-full">
                <div className="w-[65%] pr-5">
                    <Addresses
                        addressSelected={addressSelected}
                        setAddressSelected={setAddressSelected}
                    />

                    <Separator height={50} />

                    {addressSelected && <Payment />}
                </div>

                <div className="w-[35%] pl-5">
                    <Resume games={games} addressSelected={addressSelected} />
                </div>
            </div>
        </Elements>
    );
}
