/* eslint-disable @typescript-eslint/no-unused-vars */
import { orderStatusConstants } from "../../../../data/order/orderStatusConstants";
import AcceptOrderOption from "../../../molecules/Ordermanagement/AcceptOrderOption";
import SendOrderOption from "../../../molecules/Ordermanagement/SendOrderOption";

interface OrderActionProps {
  id: number;
  status: string;
  refresh: () => void;
}
export default function OrderAction({ id, status, refresh }: OrderActionProps) {
  if (status === orderStatusConstants.payment_success.code) {
    return <AcceptOrderOption id={id} key={id} refresh={refresh} />;
  }
  if (status === orderStatusConstants.process.code) {
    return <SendOrderOption id={id} key={id} refresh={refresh} />;
  }
  return <></>;
}
