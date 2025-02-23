/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { IHeaderTable } from "../data/interface";
import { cn } from "@/lib/utils";
import { connect } from "react-redux";
import { ISidebarState } from "../interface";

interface ICustomTablePrpos {
  headerData: IHeaderTable[];
  bodyData: any[];
  isSidebar?: boolean;
  widthMin?: string;
  widthMax?: string;
  total?: number;
}

const CustomTableComponent: React.FC<ICustomTablePrpos> = (props) => {
  // 1240
  const {
    headerData,
    bodyData,
    isSidebar,
    widthMax = "w-[1350px]",
    widthMin = "w-[1110px]",
    total,
  } = props;

  return (
    <>
      <div
        className={cn(
          "overflow-x-auto",
          isSidebar ? "w-[1350px]" : "w-[1110px]"
        )}
      >
        <Table className={isSidebar ? widthMax : widthMin}>
          <TableHeader className="bg-gray-50 text-[12px]">
            <TableRow className="h-[51px]">
              {headerData?.map((item, index: number) => (
                <TableHead key={index} className={item.class}>
                  {item.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="text-[14px]">
            {bodyData?.map((item, index) => (
              <TableRow key={index} className="h-[54px]">
                {headerData.map((headerCell, headerIndex) => {
                  if (headerCell.dataType === "DATA") {
                    return (
                      <TableCell
                        key={`${index}_${headerIndex}`}
                        className="whitespace-nowrap"
                      >
                        {item[headerCell.id]}
                      </TableCell>
                    );
                  } else if (
                    headerCell.dataType === "RENDER_CELL" &&
                    headerCell.renderCell
                  ) {
                    return (
                      <TableCell
                        key={`${index}_${headerIndex}`}
                        className="whitespace-nowrap"
                      >
                        {headerCell.renderCell({ row: item, index: index })}
                      </TableCell>
                    );
                  } else {
                    return (
                      <TableCell
                        key={`${index}_${headerIndex}`}
                        className="whitespace-nowrap"
                      >
                        {item[headerCell.id]}
                      </TableCell>
                    );
                  }
                })}
                {/* {headerData?.map((item, _index) =>
                  item?.renderCell ? (
                    item.renderCell()
                  ) : (
                    <TableCell key={_index} className="whitespace-nowrap">
                      {item?.data}
                    </TableCell>
                  )
                )} */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CustomPagination className="mt-5" total={total} />
    </>
  );
};

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: { onSidebar: ISidebarState }) => ({
  isSidebar: state?.onSidebar.isSidebar,
});

const CustomTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTableComponent);

export default CustomTable;
