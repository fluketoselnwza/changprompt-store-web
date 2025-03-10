export const STATE_CODE = {
  success: "success",
  fail: "fail",
};

export const STATE_STATUS_MANAGE_USER: {
  CREATE: "CREATE";
  UPDATE: "UPDATE";
  GET: "GET";
} = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  GET: "GET",
};

export const TYPE_SEARCH_INPUT = {
  TECH: "TECH",
  CUSTOMER: "CUSTOMER",
};

export const STATUS_NAME_MANAGE_USER = {
  CREATE: {
    title: "เพิ่มข้อมูลผู้ใช้งาน",
  },
  UPDATE: {
    title: "แก้ไขผู้ใช้งาน",
  },
  GET: {
    title: "ดูรายละเอียดผู้ใช้งาน",
  },
};

export const statusTaskColor = (status: string) => {
  switch (status) {
    case "รอมอบหมาย":
      return {
        color: "#723B13",
        bgColor: "#FDF6B2",
      };
    case "รอให้บริการ":
      return {
        color: "#9B1C1C",
        bgColor: "#FDE8E8",
      };
    case "กำลังให้บริการ":
      return {
        color: "#C75B0F",
        bgColor: "#FFF1E5",
      };
    case "ช่างส่งงาน":
      return {
        color: "#5521B5",
        bgColor: "#EDEBFE",
      };
    case "งานสำเร็จ":
      return {
        color: "#2C7213",
        bgColor: "#D9FFDA",
      };
    case "ลบใบงาน":
      return {
        color: "#5F5F5F",
        bgColor: "#CACACA",
      };
    default:
      return {
        color: "#723B13",
        bgColor: "#FDF6B2",
      };
  }
};
