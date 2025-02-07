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
    <Table className="text-[12px] w-[1440px]">
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="w-[100px]">เลขที่ใบงาน</TableHead>
          <TableHead>หมวดหมู่งาน</TableHead>
          <TableHead>สินค้า</TableHead>
          <TableHead>ชื่อลูกค้า</TableHead>
          <TableHead>ช่าง</TableHead>
          <TableHead>วันที่สร้าง</TableHead>
          <TableHead>ผู้ออกใบงาน</TableHead>
          <TableHead>สถานะงาน</TableHead>
          <TableHead>#</TableHead>
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
          <TableCell>
            <img src={IconSubMenu} width={22} height={22} alt="icon sub menu" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CustomTable;
