export const orderStatusConstants = {
  created: {
    code: "created",
    description: "Pesanan dibuat",
  },
  payment_success: {
    code: "payment_success",
    description: "Pembayaran berhasil",
  },
  payment_failed: {
    code: "payment_failed",
    description: "Pembayaran gagal",
  },
  process: {
    code: "process",
    description: "Pesanan diproses",
  },
  packed: {
    code: "packed",
    description: "Pesanan dikemas",
  },
  shipped: {
    code: "shipped",
    description: "Pesanan dikirim",
  },
  received: {
    code: "received",
    description: "Pesanan diterima",
  },
  done: {
    code: "done",
    description: "Pesanan selesai",
  },
  canceled: {
    code: "canceled",
    description: "Pesanan dibatalkan",
  },
};

export const orderStatus = [
  orderStatusConstants.created,
  orderStatusConstants.payment_success,
  orderStatusConstants.payment_failed,
  orderStatusConstants.process,
  orderStatusConstants.packed,
  orderStatusConstants.shipped,
  orderStatusConstants.received,
];
