"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";

import { Platform } from "@/api/platform";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const platformCtrl = new Platform();

export function Menu({ isOpenSearch = false }) {
    const [platforms, setPlatforms] = useState([]);
    const [showSearch, setShowSearch] = useState(isOpenSearch);

    function openCloseSearch() {
        setShowSearch((previousState) => !previousState);
    }

    useEffect(() => {
        async function loadPlatforms() {
            try {
                const response = await platformCtrl.getAll();
                setPlatforms(response.data ?? []);
            } catch (error) {
                console.error("Error al cargar las plataformas:", error);
            }
        }

        loadPlatforms();
    }, []);

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

            <Button
                type="button"
                size="icon"
                onClick={openCloseSearch}
                aria-label="Abrir buscador"
                aria-expanded={showSearch}
                aria-controls="search-container"
                className="absolute -right-[30px] top-0 flex h-full w-[60px] rounded-full hover:bg-primary-hover"
            >
                <Search className="size-[18px]" />
            </Button>

            {showSearch && (
                <div
                    id="search-container"
                    className="absolute inset-y-0 left-0 z-10 flex w-[calc(100%+30px)] items-center rounded-full bg-primary"
                >
                    <Input
                        id="search-games"
                        type="search"
                        placeholder="Buscador"
                        autoFocus
                        className="h-full w-full rounded-full border-0 bg-primary px-[30px] text-base text-primary-foreground shadow-none placeholder:text-primary-foreground/60 focus-visible:ring-0"
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={openCloseSearch}
                        aria-label="Cerrar buscador"
                        className="absolute -right-[50px] top-0 flex h-full cursor-pointer items-center justify-center rounded-none bg-transparent p-0 text-foreground shadow-none hover:bg-transparent hover:text-foreground dark:hover:bg-transparent active:bg-transparent"
                    >
                        <X className="size-5" />
                    </Button>
                </div>
            )}
        </div>
    );
}
