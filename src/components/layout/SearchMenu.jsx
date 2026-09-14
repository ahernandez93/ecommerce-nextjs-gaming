"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SEARCH_DELAY = 400;

export function SearchMenu() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isSearchPage = pathname === "/search";

    const initialSearchText = isSearchPage ? (searchParams.get("s") ?? "") : "";

    /*
     * Al cambiar pathname, React desmonta el estado anterior
     * y crea uno nuevo para la ruta actual.
     */
    return (
        <SearchMenuContent
            key={pathname}
            initialIsOpen={isSearchPage}
            initialSearchText={initialSearchText}
        />
    );
}

function SearchMenuContent({ initialIsOpen, initialSearchText }) {
    const router = useRouter();

    const timeoutRef = useRef(null);

    const [showSearch, setShowSearch] = useState(initialIsOpen);
    const [searchText, setSearchText] = useState(initialSearchText);

    const clearPendingSearch = useCallback(() => {
        if (!timeoutRef.current) {
            return;
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }, []);

    useEffect(() => {
        return () => {
            clearPendingSearch();
        };
    }, [clearPendingSearch]);

    const navigateToSearch = useCallback(
        (text) => {
            const normalizedText = text.trim();

            const params = new URLSearchParams();

            if (normalizedText) {
                params.set("s", normalizedText);
            }

            const query = params.toString();

            const url = query ? `/search?${query}` : "/search";

            router.replace(url, {
                scroll: true,
            });
        },
        [router],
    );

    function openCloseSearch() {
        if (showSearch) {
            clearPendingSearch();
        }

        setShowSearch((previousState) => !previousState);
    }

    function handleSearchChange(event) {
        const value = event.target.value;

        setSearchText(value);
        clearPendingSearch();

        timeoutRef.current = setTimeout(() => {
            navigateToSearch(value);
        }, SEARCH_DELAY);
    }

    function handleSearchKeyDown(event) {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        clearPendingSearch();
        navigateToSearch(searchText);
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
                        name="s"
                        type="search"
                        placeholder="Buscador"
                        autoComplete="off"
                        autoFocus
                        maxLength={100}
                        value={searchText}
                        onChange={handleSearchChange}
                        onKeyDown={handleSearchKeyDown}
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
