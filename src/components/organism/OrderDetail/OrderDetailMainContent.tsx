import {
  AbsoluteCenter,
  Button,
  Divider,
  Skeleton,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TitleHeader from "../../molecules/MyDetails/TitleHeader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOrderWithDetail } from "../../../app/redux/slice/OrderDetail/OrderDetailSlice";
import OrderInfo from "../../molecules/OrderDetail/OrderInfo";
import OrderDetails from "../../molecules/OrderDetail/OrderDetails";
import { AppDispatch, RootState } from "../../../app/redux/store";
import OrderStatus from "../../molecules/OrderDetail/OrderStatus";
import { AnimatePresence } from "framer-motion";
import OrderNotFound from "../../atoms/OrderDetail/OrderNotFound";
import FinishOrderAlert from "../../molecules/OrderDetail/FinishOrderAlert";
import { resetUpdateOrderStatusState } from "../../../app/redux/slice/OrderStatus/OrderStatus";
import { IOrderDetail } from "../../../data/order/orderDetail.interface";
import CancelOrderAlert from "../../molecules/OrderDetail/CancelOrderAlert";
import { resetCancelOrderStatusState } from "../../../app/redux/slice/OrderStatus/CancelOrder";

export default function OrderDetailMainContent() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelDisclosure = useDisclosure();
  const dispatch = useDispatch<AppDispatch>();
  const param = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const orderDetail = useSelector(
    (state: RootState) => state.getOrderDetail.orderDetail
  );
  const apiState = useSelector(
    (state: RootState) => state.getOrderDetail.apiState
  );
  const updateOrderState = useSelector(
    (state: RootState) => state.updateOrderStatus
  );
  const cancelOrderState = useSelector((state: RootState) => state.cancelOrder);
  const message = useSelector(
    (state: RootState) => state.getOrderDetail.resp.message
  );
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  const onOpenStatus = () => setIsShow(true);
  const onCloseStatus = () => {
    setIsShow(false);
  };
  const generateButton = (orderDetail: Partial<IOrderDetail>) => {
    if (
      Object.keys(orderDetail).length > 0 &&
      orderDetail.status.includes("received")
    ) {
      return (
        <>
          <Button
            w={"full"}
            onClick={onClick}
            isLoading={
              updateOrderState.apiState === "pending" ||
              cancelOrderState.apiState === "pending"
            }
          >
            Finish Order
          </Button>
          <FinishOrderAlert
            isOpen={isOpen}
            onClose={onClose}
            orderId={orderDetail.id}
          />
        </>
      );
    } else if (
      Object.keys(orderDetail).length > 0 &&
      orderDetail.status.includes("created")
    ) {
      return (
        <VStack w={"full"}>
          <Button
            bg={"errorColor"}
            w={"full"}
            onClick={onCancel}
            isLoading={
              updateOrderState.apiState === "pending" ||
              cancelOrderState.apiState === "pending"
            }
          >
            Cancel Order
          </Button>
          <Button
            as={"a"}
            w={"full"}
            onClick={onClick}
            href={orderDetail.howToPay}
            target="_blank"
          >
            How To Pay
          </Button>
          <CancelOrderAlert
            isOpen={cancelDisclosure.isOpen}
            onClose={cancelDisclosure.onClose}
            orderId={orderDetail.id}
          />
        </VStack>
      );
    } else if (
      Object.keys(orderDetail).length > 0 &&
      (orderDetail.status.includes("payment_success") ||
        orderDetail.status.includes("process"))
    ) {
      return (
        <VStack w={"full"}>
          <Button
            bg={"errorColor"}
            w={"full"}
            onClick={onCancel}
            isLoading={
              updateOrderState.apiState === "pending" ||
              cancelOrderState.apiState === "pending"
            }
          >
            Cancel Order
          </Button>
          <CancelOrderAlert
            isOpen={cancelDisclosure.isOpen}
            onClose={cancelDisclosure.onClose}
            orderId={orderDetail.id}
          />
        </VStack>
      );
    }
  };

  const onClick = () => onOpen();
  const onCancel = () => cancelDisclosure.onOpen();
  const generateToastStatus = () => {
    if (
      Object.keys(updateOrderState.resp).length === 0 &&
      Object.keys(cancelOrderState.resp).length === 0
    ) {
      return "error";
    }

    if (Object.keys(updateOrderState.resp).length > 0) {
      if (updateOrderState.resp?.statusCode.toString().startsWith("2")) {
        return "success";
      } else {
        return "error";
      }
    } else if (Object.keys(cancelOrderState.resp).length > 0) {
      if (cancelOrderState.resp?.statusCode.toString().startsWith("2")) {
        return "success";
      } else {
        return "error";
      }
    }
  };
  useEffect(() => {
    dispatch(
      fetchOrderWithDetail({
        invoiceNo: param.invoiceNo!,
        branchId: branchId
          ? branchId
          : JSON.parse(localStorage.getItem("branch")).id,
      })
    );
  }, [dispatch, branchId, param.invoiceNo]);

  useEffect(() => {
    if (
      (Object.keys(updateOrderState.resp).length === 0 &&
        Object.keys(cancelOrderState.resp).length === 0) ||
      (updateOrderState.apiState === "idle" &&
        cancelOrderState.apiState === "idle") ||
      (cancelOrderState.apiState === "pending" &&
        updateOrderState.apiState === "pending")
    ) {
      return;
    }

    toast({
      duration: 3000,
      position: "top",
      title: "Order",
      description: updateOrderState.resp.message
        ? updateOrderState.resp.message
        : cancelOrderState.resp.message,
      status: generateToastStatus(),
    });

    if (
      Object.keys(updateOrderState.resp).length > 0 ||
      Object.keys(cancelOrderState.resp).length > 0
    ) {
      dispatch(
        fetchOrderWithDetail({
          invoiceNo: param.invoiceNo!,
          branchId: branchId
            ? branchId
            : JSON.parse(localStorage.getItem("branch")).id,
        })
      );
    }

    if (Object.keys(updateOrderState.resp).length > 0) {
      dispatch(resetUpdateOrderStatusState());
    } else {
      dispatch(resetCancelOrderStatusState());
    }
  }, [
    toast,
    updateOrderState.apiState,
    updateOrderState.resp,
    dispatch,
    cancelOrderState.apiState,
    cancelOrderState.resp,
  ]);

  return (
    <VStack
      spacing={"1rem"}
      w={"full"}
      position={"relative"}
      pb={"1rem"}
      h={"100dvh"}
    >
      <TitleHeader
        title={"Order Detail"}
        callback={() => {
          navigate(-1);
        }}
      />
      <Divider />
      {apiState === "rejected" && message.includes("Order not found") ? (
        <AbsoluteCenter>
          <OrderNotFound />
        </AbsoluteCenter>
      ) : (
        <>
          <Skeleton
            h={apiState === "done" ? "auto" : "280px"}
            w={"full"}
            isLoaded={apiState === "done"}
            borderRadius={"18px"}
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
            borderRadius={"18px"}
            h={apiState === "done" ? "auto" : "280px"}
            w={"full"}
            isLoaded={apiState === "done"}
          >
            {Object.keys(orderDetail).length > 0 && (
              <OrderDetails details={orderDetail.orderDetails!} />
            )}
          </Skeleton>
          {apiState === "pending" ? (
            <Skeleton w={"full"} borderRadius={"18px"} h={"40px"} p={0} />
          ) : (
            generateButton(orderDetail)
          )}

          <AnimatePresence>
            {isShow && Object.keys(orderDetail).length > 0 && (
              <OrderStatus
                orderStatus={orderDetail.orderStatus!}
                onClose={onCloseStatus}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </VStack>
  );
}
