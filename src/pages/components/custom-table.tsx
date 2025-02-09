import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomPagination from "./custom-pagination";
import { IHeaderTable, IBodyTable } from "../data/interface";
import { cn } from "@/lib/utils";

interface ICustomTablePrpos {
  headerData: IHeaderTable[];
  bodyData: {
    data: IBodyTable[];
  }[];
  width?: number;
}

const CustomTable: React.FC<ICustomTablePrpos> = (props) => {
  const { headerData, width = 1440, bodyData } = props;

  return (
    <>
      <Table className={cn("text-[12px]", `w-[${width}px]`)}>
        <TableHeader className="bg-gray-50">
          <TableRow>
            {headerData?.map((item, index: number) => (
              <TableHead key={index} className={item.class}>
                {item.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bodyData?.map((body, index) => (
            <TableRow key={index}>
              {body?.data?.map((item, _index) =>
                item?.renderCell ? (
                  item.renderCell()
                ) : (
                  <TableCell key={_index}>{item?.data}</TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination className="mt-3" />
    </>
  );
};

export default CustomTable;
