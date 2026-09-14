"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Pagination as PaginationUI,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function Pagination({ currentPage, totalPages }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const page = Number(currentPage);
    const pageCount = Number(totalPages);

    if (!pageCount || pageCount <= 1) {
        return null;
    }

    function createPageUrl(pageNumber) {
        const params = new URLSearchParams(searchParams.toString());

        if (pageNumber === 1) {
            params.delete("page");
        } else {
            params.set("page", String(pageNumber));
        }

        const query = params.toString();

        return query ? `${pathname}?${query}` : pathname;
    }

    function changePage(event, pageNumber) {
        event.preventDefault();

        if (pageNumber < 1 || pageNumber > pageCount || pageNumber === page) {
            return;
        }

        router.replace(createPageUrl(pageNumber), {
            scroll: true,
        });
    }

    return (
        <PaginationUI className="mt-5">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={createPageUrl(page - 1)}
                        text="Anterior"
                        aria-disabled={page === 1}
                        tabIndex={page === 1 ? -1 : undefined}
                        onClick={(event) => changePage(event, page - 1)}
                        className={
                            page === 1
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                    />
                </PaginationItem>

                {Array.from({ length: pageCount }, (_, index) => {
                    const pageNumber = index + 1;
                    const isActive = pageNumber === page;

                    return (
                        <PaginationItem key={pageNumber}>
                            <PaginationLink
                                href={createPageUrl(pageNumber)}
                                isActive={isActive}
                                onClick={(event) =>
                                    changePage(event, pageNumber)
                                }
                                className={
                                    isActive
                                        ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                                        : "hover:bg-primary hover:text-primary-foreground"
                                }
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href={createPageUrl(page + 1)}
                        text="Siguiente"
                        aria-disabled={page === pageCount}
                        tabIndex={page === pageCount ? -1 : undefined}
                        onClick={(event) => changePage(event, page + 1)}
                        className={
                            page === pageCount
                                ? "pointer-events-none opacity-50"
                                : undefined
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationUI>
    );
}
