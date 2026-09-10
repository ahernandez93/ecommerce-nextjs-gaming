import Image from "next/image";
import Link from "next/link";

import { Account } from "./Account";
import { Menu } from "./Menu";

export function TopBar() {
    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 py-5">
            <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4">
                <Link
                    href="/"
                    aria-label="Ir a la página principal"
                    className="shrink-0"
                >
                    <Image
                        src="/images/logo.png"
                        alt="Gaming"
                        width={486}
                        height={90}
                        loading="eager"
                        priority
                        className="h-[30px] w-auto"
                    />
                </Link>

                <div className="flex min-w-0 justify-end lg:justify-center">
                    <Menu />
                </div>

                <Account />
            </div>
        </header>
    );
}
