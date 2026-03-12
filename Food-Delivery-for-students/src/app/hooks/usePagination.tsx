"use client"

import { usePathname, useSearchParams, useRouter } from "next/navigation"

export const usePagination = (totalPages: number = 10, genreId?: string | number) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const maxVisibleButtons = 3;
    const currentPage = Number(searchParams.get("page") ?? 1);

    const handlePageChange = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    const handlePrev = () => {
        if (currentPage > 1) handlePageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) handlePageChange(currentPage + 1);
    };

    const getDisplayPages = () => {
        let start = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
        let end = start + maxVisibleButtons - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxVisibleButtons + 1);
        }
        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    return { handlePrev, handleNext, handlePageChange, currentPage, displayPages: getDisplayPages(), totalPages };
}