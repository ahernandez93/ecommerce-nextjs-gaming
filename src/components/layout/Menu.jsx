import Link from "next/link";
import Image from "next/image";
import { Platform } from "@/api/platform";
import { SearchMenu } from "./SearchMenu";

const platformCtrl = new Platform();

export async function Menu() {
    let platforms = [];

    try {
        const response = await platformCtrl.getAll();

        platforms = response?.data ?? [];
    } catch (error) {
        console.error("Error al cargar las plataformas:", error);
    }

    return (
        <div className="relative flex items-end justify-end rounded-l-full bg-secondary/75 py-0 pl-5 pr-[50px] backdrop-blur-xl">
            {platforms.map((platform) => (
                <Link
                    key={platform.documentId}
                    href={`/games/${platform.slug}`}
                    className="flex items-center px-[15px] py-5 text-sm font-medium hover:text-primary"
                >
                    {platform.icon?.url && (
                        <Image
                            src={platform.icon.url}
                            alt=""
                            aria-hidden="true"
                            width={16}
                            height={16}
                            className="mr-2.5 size-4 object-contain brightness-0 invert"
                        />
                    )}

                    {platform.title}
                </Link>
            ))}

            <SearchMenu />
        </div>
    );
}
