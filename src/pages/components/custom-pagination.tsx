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
}

const CustomPagination: React.FC<ICustomerProps> = (props) => {
  const { className } = props;

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <div className="flex items-center gap-1">
        <p>Showing</p>
        <p className="font-bold">1-10</p>
        <p>of</p>
        <p className="font-bold">1000</p>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className="rounded-tl-[4px] rounded-bl-[4px]">
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">100</PaginationLink>
          </PaginationItem>
          <PaginationItem className="rounded-tr-[4px] rounded-br-[4px]">
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;
