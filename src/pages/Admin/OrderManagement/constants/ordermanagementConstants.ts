import { orderStatusConstants } from "../../../../data/order/orderStatusConstants";

export const orderStatus = [
  {
    value: "",
    label: "No Filter",
  },
  {
    value: orderStatusConstants.created.code,
    label: "Menunggu Pembayaran",
  },
  {
    value: orderStatusConstants.payment_success.code,
    label: orderStatusConstants.payment_success.description,
  },
  {
    value: orderStatusConstants.process.code,
    label: orderStatusConstants.process.description,
  },
  {
    value: orderStatusConstants.shipped.code,
    label: orderStatusConstants.shipped.description,
  },
  {
    value: orderStatusConstants.received.code,
    label: orderStatusConstants.received.description,
  },
];

export const orderByOptions = [
  {
    value: "",
    label: "No Filter",
  },
  {
    value: "dateAsc",
    label: "Date ASC",
  },
  {
    value: "dateDesc",
    label: "Date DESC",
  },
  {
    value: "totalPrice",
    label: "Total Terendah",
  },
  {
    value: "totalPriceDesc",
    label: "Total Tertinggi",
  },
];
