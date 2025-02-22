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
import { connect } from "react-redux";
import { ISidebarState } from "../interface";

interface ICustomTablePrpos {
  headerData: IHeaderTable[];
  bodyData: {
    data: IBodyTable[];
  }[];
  isSidebar?: boolean;
  widthMin?: string;
  widthMax?: string;
}

const CustomTableComponent: React.FC<ICustomTablePrpos> = (props) => {
  // 1240
  const {
    headerData,
    bodyData,
    isSidebar,
    widthMax = "w-[1350px]",
    widthMin = "w-[1110px]",
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

const mapDispatchToProps = () => ({});

const mapStateToProps = (state: { onSidebar: ISidebarState }) => ({
  isSidebar: state?.onSidebar.isSidebar,
});

const CustomTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomTableComponent);

export default CustomTable;
