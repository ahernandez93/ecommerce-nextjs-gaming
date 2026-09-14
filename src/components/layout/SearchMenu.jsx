"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchMenu({ isOpenSearch = false }) {
    const [showSearch, setShowSearch] = useState(isOpenSearch);

    function openCloseSearch() {
        setShowSearch((previousState) => !previousState);
    }

    return (
        <>
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
        </>
    );
}
