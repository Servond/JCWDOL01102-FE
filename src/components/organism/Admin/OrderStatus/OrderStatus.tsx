import { Tag } from "@chakra-ui/react";
import { orderStatusConstants } from "../../../../data/order/orderStatusConstants";

interface OrderStatusProps {
  status: string;
}

export default function OrderStatus({ status }: OrderStatusProps) {
  switch (status) {
    case orderStatusConstants.created.code:
      return <Tag colorScheme='yellow'>Menunggu Pembayaran</Tag>;
    case orderStatusConstants.payment_success.code:
      return <Tag colorScheme='green'>Pembayaran Berhasil</Tag>;
    case orderStatusConstants.payment_failed.code:
      return <Tag colorScheme='red'>Pembayaran Gagal</Tag>;
    case orderStatusConstants.process.code:
      return <Tag colorScheme='blue'>Pesanan Diproses</Tag>;
    case orderStatusConstants.shipped.code:
      return <Tag colorScheme='blue'>Pesanan Dikirim</Tag>;
    case orderStatusConstants.received.code:
      return <Tag colorScheme='green'>Pesanan Diterima</Tag>;
    case orderStatusConstants.canceled.code:
      return <Tag colorScheme='red'>Pesanan Dibatalkan</Tag>;
    case orderStatusConstants.done.code:
      return <Tag colorScheme='green'>Pesanan Selesai</Tag>;
    default:
      return <Tag colorScheme='green'>-</Tag>;
  }
}
