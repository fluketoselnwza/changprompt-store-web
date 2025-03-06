import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface ICustomerProps {
  className?: string;
  total?: number;
  pageSize?: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const CustomPagination: React.FC<ICustomerProps> = (props) => {
  const {
    className,
    total = 0,
    pageSize = 10,
    currentPage = 1,
    setCurrentPage,
  } = props;

  const totalPages = Math.ceil(total / pageSize);

  // Calculate the range of items being displayed
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, total);

  // Update the current page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="flex items-center gap-1">
        <p>Showing</p>
        <p className="font-bold">
          {startItem}-{endItem}
        </p>
        <p>of</p>
        <p className="font-bold">{total}</p>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="rounded-tl-[4px] rounded-bl-[4px]">
            <PaginationPrevious
              href="#"
              onClick={() =>
                currentPage === 1
                  ? console.log("current")
                  : goToPage(currentPage - 1)
              }
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              className="text-[14px]"
              href="#"
              onClick={() => goToPage(1)}
              isActive={1 === currentPage}
            >
              1
            </PaginationLink>
          </PaginationItem>
          {currentPage - 2 > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {pageNumbers?.length > 1
            ? pageNumbers
                .slice(
                  currentPage > 3 ? currentPage - 2 : 1,
                  currentPage > 3 && currentPage < totalPages ? currentPage : 3
                )
                .map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className="text-[14px]"
                      href="#"
                      onClick={() => goToPage(page)}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))
            : null}
          {totalPages - 2 > currentPage && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {totalPages > 3 &&
            pageNumbers.slice(totalPages - 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  className="text-[14px]"
                  href="#"
                  onClick={() => goToPage(page)}
                  isActive={page === currentPage}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem className="rounded-tr-[4px] rounded-br-[4px]">
            <PaginationNext
              href="#"
              onClick={() =>
                currentPage === totalPages
                  ? console.log("last")
                  : goToPage(currentPage + 1)
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
