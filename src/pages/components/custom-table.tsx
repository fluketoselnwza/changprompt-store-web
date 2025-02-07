import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconSubMenu from "@/assets/icons/icon-sub-menu.png";

const CustomTable = () => {
  return (
    <Table className="text-[12px] w-[1400px]">
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="w-[140px]">เลขที่ใบงาน</TableHead>
          <TableHead className="w-[140px]">หมวดหมู่งาน</TableHead>
          <TableHead className="w-[140px]">สินค้า</TableHead>
          <TableHead className="w-[140px]">ชื่อลูกค้า</TableHead>
          <TableHead className="w-[140px]">ช่าง</TableHead>
          <TableHead className="w-[140px]">วันที่สร้าง</TableHead>
          <TableHead className="w-[140px]">ผู้ออกใบงาน</TableHead>
          <TableHead className="w-[140px]">สถานะงาน</TableHead>
          <TableHead className="w-[40px] text-center sticky right-0 bg-gray-50 z-10">
            <span>#</span>
          </TableHead>
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
  );
};

export default CustomTable;
