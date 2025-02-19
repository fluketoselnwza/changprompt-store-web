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

interface ICustomTablePrpos {
  headerData: IHeaderTable[];
  bodyData: {
    data: IBodyTable[];
  }[];
  width?: number;
}

const CustomTable: React.FC<ICustomTablePrpos> = (props) => {
  const { headerData, bodyData, width = 1200 } = props;

  return (
    <>
      <div className="overflow-x-auto w-full">
        <Table className={`w-[${width}px]`}>
          <TableHeader className="bg-gray-50 text-[12px]">
            <TableRow>
              {headerData?.map((item, index: number) => (
                <TableHead key={index} className={item.class}>
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-[14px]">
            {bodyData?.map((body, index) => (
              <TableRow key={index} className="h-[54px]">
                {body?.data?.map((item, _index) =>
                  item?.renderCell ? (
                    item.renderCell()
                  ) : (
                    <TableCell key={_index} className="whitespace-nowrap">
                      {item?.data}
                    </TableCell>
                  )
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CustomPagination className="mt-5" />
    </>
  );
};

export default CustomTable;
