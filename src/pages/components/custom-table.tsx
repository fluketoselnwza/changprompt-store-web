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
  textNotFoundData?: string;
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

const CustomTableComponent: React.FC<ICustomTablePrpos> = (props) => {
  // 1240
  const {
    headerData,
    bodyData,
    isSidebar,
    widthMax = "full:w-[1810px] desktop:w-[1350px] tablet:w-[1110px]",
    widthMin = "full:w-[1510px] desktop:w-[1110px] tablet:w-[870px]",
    total,
    textNotFoundData,
    currentPage = 1,
    setCurrentPage,
  } = props;

  return (
    <>
      <div
        className={cn(
          "overflow-x-auto",
          isSidebar
            ? "full:w-[1810px] desktop:w-[1350px] tablet:w-[1110px]"
            : "full:w-[1510px] desktop:w-[1110px] tablet:w-[870px]"
        )}
      >
        <Table className={isSidebar ? widthMax : widthMin}>
          <TableHeader className="bg-gray-50 text-[12px]">
            <TableRow className="h-[50px]">
              {headerData?.map((item, index: number) => (
                <TableHead
                  key={index}
                  className={cn("font-semibold", item.class)}
                >
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
                      <TableCell key={`${index}_${headerIndex}`}>
                        {headerCell.renderCell({ row: item, index: index })}
                      </TableCell>
                    );
                  } else if (headerCell.dataType === "SUB_MENU") {
                    return (
                      <TableCell
                        key={`${index}_${headerIndex}`}
                        className="sticky z-10 right-0 bg-white"
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {bodyData?.length ? (
        <CustomPagination
          className="mt-5"
          total={total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div className="text-center py-6">{textNotFoundData}</div>
      )}
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
