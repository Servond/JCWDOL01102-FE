import { FaUserGear } from "react-icons/fa6";
import { FaBoxes } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsClipboard2DataFill } from "react-icons/bs";
import { OptionType } from "./interfaces";
interface IDashBoarMeta {
  fieldName: string;
  icon: React.ElementType;
  path: string;
  role: string[];
}

type DashboardNavMeta = IDashBoarMeta[];

export enum Role {
  SUPER_ADMIN = "super_admin",
  BRANCH_ADMIN = "branch_admin",
  USER = "user",
}

export enum DiscountType {
  PROMOTION = "promotion",
  VOUCHER = "voucher",
}

export enum VoucherType {
  PRICE_CUT = "price_cut",
  TOTAL_PRICE_CUT = "total_price_cut",
  FREE_SHIPPING = "free_shipping",
}

export enum PromotionType {
  BUY_ONE_GET_ONE = "buy_one_get_one",
  PRICE_CUT = "price_cut",
}

export enum DiscountValueType {
  PERCENTAGE = "percentage",
  FIXED_PRICE = "fixed_price",
}
export const constants = {
  authInputField: ["Name", "Email", "Number", "Password"],
  userManegementFilterField: [
    { value: "0", label: "No Filter" },
    { value: "1", label: "Super Admin" },
    { value: "2", label: "Branch Admin" },
    { value: "3", label: "User" },
  ],
  userManagementSortField: [
    { value: "", label: "No Sort" },
    { value: "ASC", label: "A-Z" },
    { value: "DESC", label: "Z-A" },
  ] as OptionType[],
  voucherFilterField: [
    { value: "", label: "No Filter" },
    { value: "status:active", label: "Status: Active" },
    { value: "status:inactive", label: "Status: Inactive" },
    { value: `type:${VoucherType.PRICE_CUT}`, label: "Type: Price Cut" },
    {
      value: `type:${VoucherType.TOTAL_PRICE_CUT}`,
      label: "type: Total Price Cut",
    },
    {
      value: `type:${VoucherType.FREE_SHIPPING}`,
      label: "type: Free Shipping",
    },
  ] as OptionType[],
  promotionFilterField: [
    { value: "", label: "No Filter" },
    { value: "status:active", label: "Status: Active" },
    { value: "status:inactive", label: "Status: Inactive" },
    { value: `type:${PromotionType.PRICE_CUT}`, label: "Type: Price Cut" },
    {
      value: `type:${PromotionType.BUY_ONE_GET_ONE}`,
      label: "type: Buy One Get One",
    },
  ] as OptionType[],
  voucherSortField: [
    { value: "", label: "No Sort" },
    { value: "ASC", label: "A-Z" },
    { value: "DESC", label: "Z-A" },
  ] as OptionType[],
  discountTypeField: [
    { value: DiscountType.VOUCHER, label: "Voucher" },
    { value: DiscountType.PROMOTION, label: "Promotion" },
  ] as OptionType[],
  promotionType: [
    { value: PromotionType.BUY_ONE_GET_ONE, label: "Buy One Get One" },
    {
      value: PromotionType.PRICE_CUT,
      label: "Price Cut",
    },
  ] as OptionType[],
  voucherType: [
    { value: VoucherType.PRICE_CUT, label: "Price Cut" },
    {
      value: VoucherType.TOTAL_PRICE_CUT,
      label: "Total Price Cut",
    },
    {
      value: VoucherType.FREE_SHIPPING,
      label: "Free Shipping",
    },
  ] as OptionType[],
  discountValueType: [
    { value: DiscountValueType.PERCENTAGE, label: "Percentage (%)" },
    {
      value: DiscountValueType.FIXED_PRICE,
      label: "Price (Rp)",
    },
  ] as OptionType[],
  dashboardField: [
    {
      fieldName: "Admin Management",
      icon: FaUserGear,
      path: "/dashboard/user-management",
      role: [Role.SUPER_ADMIN],
    },
    {
      fieldName: "Products",
      icon: FaBoxes,
      path: "/dashboard/products",
      role: [Role.BRANCH_ADMIN],
    },
    {
      fieldName: "Discount",
      icon: IoTicket,
      path: "/dashboard/discount-management",
      role: [Role.BRANCH_ADMIN],
    },
    {
      fieldName: "Categories",
      icon: BiSolidCategoryAlt,
      path: "/dashboard/categories",
      role: [Role.BRANCH_ADMIN],
    },
    {
      fieldName: "Report",
      icon: BsClipboard2DataFill,
      path: "/dashboard/report",
      role: [Role.BRANCH_ADMIN, Role.SUPER_ADMIN],
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
