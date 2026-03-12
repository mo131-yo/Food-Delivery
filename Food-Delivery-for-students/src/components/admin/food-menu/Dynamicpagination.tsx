  "use client"

import { usePagination } from "@/app/hooks/usePagination";
  import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  import { cn } from "@/lib/utils";

 interface DynamicPaginationProps {
  totalPages: number;
  genreId?: string | number;
}

  
export const DynamicPagination = ({ totalPages, genreId }: DynamicPaginationProps) => {
  const { displayPages, currentPage, handleNext, handlePageChange, handlePrev } = usePagination(totalPages, String(genreId ?? ""));

    return (
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious onClick={handlePrev} />
            </PaginationItem>
          )}
          {displayPages.map((pageNumber) => (
            <PaginationItem key={pageNumber} className="cursor-pointer">
              <PaginationLink 
                onClick={() => handlePageChange(pageNumber)} 
                isActive={pageNumber === currentPage}
                className={cn(pageNumber === currentPage && "bg-accent text-accent-foreground")}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {currentPage < totalPages && (
            <PaginationItem className="cursor-pointer">
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }