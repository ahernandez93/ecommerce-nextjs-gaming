import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function BannerAd({ title, subtitle, btnTitle, btnLink, image }) {
    return (
        <section
            className="
                relative flex h-[500px] w-full overflow-hidden
                bg-[#489bca]
                bg-[radial-gradient(circle_at_center_bottom,#489bca_0%,#154483_29%,#0f0f1b_73%)]
                after:absolute after:bottom-[-1px] after:left-0
                after:z-20 after:h-[60px] after:w-full
                after:bg-background
                after:[clip-path:polygon(0_100%,100%_100%,0_0)]
            "
        >
            <div className="relative mx-auto h-full w-full max-w-[1127px] px-4 sm:px-6 lg:px-8 xl:px-0">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 1280px"
                    className="object-contain object-right-bottom pt-[30px]"
                    loading="eager"
                />
            </div>

            <div className="absolute inset-0 z-10 flex items-center">
                <div className="mx-auto w-full max-w-[1127px] px-4 sm:px-6 lg:px-8 xl:px-0">
                    <h2 className="text-3xl font-bold text-white">{title}</h2>

                    <h3 className="mb-5 mt-1 text-base font-normal text-white">
                        {subtitle}
                    </h3>

                    <Button asChild>
                        <Link href={btnLink}>{btnTitle}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
