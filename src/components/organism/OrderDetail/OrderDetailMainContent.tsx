import { Divider, Skeleton, VStack } from "@chakra-ui/react";
import TitleHeader from "../../molecules/MyDetails/TitleHeader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderWithDetail } from "../../../app/redux/slice/OrderDetail/OrderDetailSlice";
import OrderInfo from "../../molecules/OrderDetail/OrderInfo";
import OrderDetails from "../../molecules/OrderDetail/OrderDetails";
import { AppDispatch, RootState } from "../../../app/redux/store";
import OrderStatus from "../../molecules/OrderDetail/OrderStatus";
import { AnimatePresence } from "framer-motion";

export default function OrderDetailMainContent() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const param = useParams();
  const orderDetail = useSelector(
    (state: RootState) => state.getOrderDetail.orderDetail
  );
  const apiState = useSelector(
    (state: RootState) => state.getOrderDetail.apiState
  );
  const onOpenStatus = () => setIsShow(true);
  const onCloseStatus = () => {
    setIsShow(false);
  };
  useEffect(() => {
    dispatch(fetchOrderWithDetail(param.invoiceNo!));
  }, []);

  return (
    <VStack spacing={"1rem"} w={"full"} h={"100dvh"} position={"relative"}>
      <TitleHeader title={"Detail Order"} />
      <Divider />
      <Skeleton
        h={apiState === "done" ? "auto" : "200px"}
        w={"full"}
        isLoaded={apiState === "done"}
      >
        {Object.keys(orderDetail).length > 0 && (
          <OrderInfo
            address={orderDetail.address!}
            invoiceNo={orderDetail.invoiceNo!}
            transactionDate={orderDetail.createdAt!}
            total={orderDetail.total!}
            onOpenStatus={onOpenStatus}
          />
        )}
      </Skeleton>
      <Skeleton
        h={apiState === "done" ? "auto" : "200px"}
        w={"full"}
        isLoaded={apiState === "done"}
      >
        {Object.keys(orderDetail).length > 0 && (
          <OrderDetails details={orderDetail.orderDetails!} />
        )}
      </Skeleton>
      <AnimatePresence>
        {isShow && Object.keys(orderDetail).length > 0 && (
          <OrderStatus
            orderStatus={orderDetail.orderStatus!}
            onClose={onCloseStatus}
          />
        )}
      </AnimatePresence>
    </VStack>
  );
}
