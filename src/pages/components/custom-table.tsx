import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";
import CustomPagination from "./custom-pagination";
import { IHeaderTable } from "../data/interface";

interface ICustomTablePrpos {
  headerData: IHeaderTable[];
}

const CustomTable: React.FC<ICustomTablePrpos> = (props) => {
  const { headerData } = props;

  return (
    <>
      <Table className="text-[12px] w-[1400px]">
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
          <TableRow>
            <TableCell>#INS-24020001-0001</TableCell>
            <TableCell>ติดตั้ง</TableCell>
            <TableCell>แอร์</TableCell>
            <TableCell>Brooklyn Simmons</TableCell>
            <TableCell>Annette Black</TableCell>
            <TableCell>01/05/2024</TableCell>
            <TableCell>#1000345678 : แอดมิน</TableCell>
            <TableCell>
              <div className="bg-[#FDF6B2] text-[#723B13] flex items-center justify-center">
                รอมอบหมาย
              </div>
            </TableCell>
            <TableCell className="sticky right-0 bg-gray-50 z-10">
              <img
                src={IconSubMenu}
                width={22}
                height={22}
                alt="icon sub menu"
                className="mx-auto"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CustomPagination className="mt-3" />
    </>
  );
};

export default CustomTable;
