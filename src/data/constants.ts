import { FaUserGear } from "react-icons/fa6";
import { FaBoxes } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";

interface IDashBoarMeta {
  fieldName: string;
  icon: React.ElementType;
  path: string;
  role: string[];
}

type DashboardNavMeta = IDashBoarMeta[];

export const constants = {
  authInputField: ["Name", "Email", "Number", "Password"],
  dashboardField: [
    {
      fieldName: "User Management",
      icon: FaUserGear,
      path: "/dashboard/user-management",
      role: ["super_admin"],
    },
    {
      fieldName: "Products",
      icon: FaBoxes,
      path: "/dashboard/products",
      role: ["branch_admin"],
    },
    {
      fieldName: "Voucher",
      icon: IoTicket,
      path: "/dashboard/voucher",
      role: ["branch_admin"],
    },
    {
      fieldName: "Categories",
      icon: BiSolidCategoryAlt,
      path: "/dashboard/categories",
      role: ["branch_admin"],
    },
  ] as DashboardNavMeta,
};

export enum Permission {
  SUPERADMIN_ACCESS = "superadmin_access",
  MANAGE_ADMIN = "manage_admin",
  MANAGE_BRANCH = "manage_branch",
  CAN_READ_PRODUCT = "can_read_product",
  CAN_CREATE_PRODUCT = "can_create_product",
  CAN_REMOVE_PRODUCT = "can_remove_product",
  CAN_READ_DISCOUNT = "can_read_discount",
  CAN_CREATE_DISCOUNT = "can_create_discount",
  CAN_UPDATE_DISCOUNT = "can_update_discount",
  CAN_REMOVE_DISCOUNT = "can_remove_discount",
  CAN_READ_REPORT = "can_read_report",
  CAN_GENERATE_REPORT = "can_generate_report",
  CAN_UPDATE_REPORT = "can_update_report",
  CAN_REMOVE_REPORT = "can_remove_report",
  CAN_CREATE_TRANSACTION = "can_create_transaction",
  CAN_READ_CART = "can_read_cart",
  CAN_CREATE_CART = "can_create_cart",
  CAN_UPDATE_CART = "can_update_cart",
  CAN_REMOVE_CART = "can_remove_cart",
}

export enum Role {
  SUPER_ADMIN = "super_admin",
  BRANCH_ADMIN = "branch_admin",
  USER = "user",
}
