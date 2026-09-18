"use client";

import Image from "next/image";
import Link from "next/link";

import { Check, LockKeyhole } from "lucide-react";
import { useSearchParams } from "next/navigation";

const steps = [
    { number: 1, title: "Cesta" },
    { number: 2, title: "Pago" },
    { number: 3, title: "Confirmación" },
];

function parseCurrentStep(value) {
    const step = Number.parseInt(value ?? "1", 10);

    return step >= 1 && step <= steps.length ? step : 1;
}

export function HeaderCart() {
    const searchParams = useSearchParams();

    const currentStep = parseCurrentStep(searchParams.get("step"));

    return (
        <header className="fixed inset-x-0 top-0 z-50 flex h-[77px] w-full items-center bg-surface-deep px-5">
            <div className="w-[20%]">
                <Link
                    href="/"
                    aria-label="Volver a la página principal"
                    className="inline-flex"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Gaming"
                        width={486}
                        height={90}
                        priority
                        className="h-[30px] w-auto"
                    />
                </Link>
            </div>

            <nav
                aria-label="Progreso de la compra"
                className="flex w-[60%] justify-center"
            >
                <ol className="flex items-center">
                    {steps.map((step) => {
                        const isActive = step.number === currentStep;

                        const isCompleted = step.number < currentStep;

                        return (
                            <li
                                key={step.number}
                                aria-current={isActive ? "step" : undefined}
                                className="flex items-center"
                            >
                                <span
                                    className={`
                                        mr-[10px] flex size-[26px] shrink-0
                                        items-center justify-center rounded-full
                                        border-[3px] text-xs
                                        ${
                                            isActive || isCompleted
                                                ? "border-primary"
                                                : "border-[#303030]"
                                        }
                                        ${
                                            isCompleted
                                                ? "bg-primary text-white"
                                                : isActive
                                                  ? "text-white"
                                                  : "text-[#777777]"
                                        }
                                    `}
                                >
                                    {isCompleted ? (
                                        <Check
                                            aria-hidden="true"
                                            className="size-3.5"
                                            strokeWidth={3}
                                        />
                                    ) : (
                                        step.number
                                    )}
                                </span>

                                <span
                                    className={
                                        isActive
                                            ? "text-sm text-white"
                                            : "text-sm text-[#777777]"
                                    }
                                >
                                    {step.title}
                                </span>

                                {step.number < steps.length && (
                                    <span
                                        aria-hidden="true"
                                        className={`
                                            ml-[15px] mr-5 h-[3px] w-[100px]
                                            ${
                                                isCompleted
                                                    ? "bg-primary"
                                                    : "bg-[#303030]"
                                            }
                                        `}
                                    />
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            <div className="flex w-[20%] items-center justify-end">
                <LockKeyhole
                    aria-hidden="true"
                    className="mr-[10px] size-5 text-[#52c41a]"
                    strokeWidth={3}
                />

                <div className="flex h-9 flex-col justify-center border-l border-[#303030] pl-[10px]">
                    <span className="text-[13px] font-bold leading-none text-white">
                        Pago seguro
                    </span>

                    <span className="mt-1 text-[11px] leading-none text-[#777777]">
                        256-bit SSL Secure
                    </span>
                </div>
            </div>
        </header>
    );
}
