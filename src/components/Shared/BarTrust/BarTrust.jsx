import { data } from "./BarTrust.data";

export function BarTrust() {
    return (
        <section className="w-full bg-[#0f0f0f]">
            <div
                className="
                    mx-auto flex w-full max-w-[1127px]
                    flex-col items-stretch justify-center
                    px-4 py-10
                    md:flex-row md:items-center
                    xl:px-0
                "
            >
                {data.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="
                                flex items-center
                                border-b border-[#343434]
                                px-[30px] py-5
                                last:border-0
                                md:border-b-0 md:border-r md:py-0
                                md:last:border-r-0
                            "
                        >
                            <Icon
                                className="
                                    mr-[15px] size-[35px]
                                    shrink-0 text-primary
                                "
                                strokeWidth={2.5}
                                aria-hidden="true"
                            />

                            <div>
                                <h5 className="text-xl font-semibold leading-6 text-white">
                                    {item.title}
                                </h5>

                                <span className="mt-0.5 block text-[13px] leading-4 text-[#8f8f8f]">
                                    {item.description}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
