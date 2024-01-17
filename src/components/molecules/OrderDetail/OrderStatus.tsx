import {
  HStack,
  Heading,
  Step,
  StepSeparator,
  Stepper,
  VStack,
  useMediaQuery,
  useSteps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IOrderStatus } from "../../../data/OrderDetail/interface";
import OrderStatusIndicator from "../../atoms/OrderDetail/OrderStatusIndicator";
import OrderStatusInfo from "../../atoms/OrderDetail/OrderSatusInfo";
import StatusCloseButton from "../../atoms/OrderDetail/StatusCloseButton";

interface IOrderStatusProps {
  orderStatus: IOrderStatus[];
  onClose: () => void;
}
export default function OrderStatus(props: IOrderStatusProps) {
  const { activeStep } = useSteps({
    count: props.orderStatus.length,
    index: props.orderStatus.length,
  });

  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const generateColor = (orderStatus: IOrderStatus[], index: number) => {
    if (index + 1 === orderStatus.length) {
      return "#53B175";
    }

    if (
      props.orderStatus[index + 1].status.includes("failed") ||
      props.orderStatus[index + 1].status.includes("cancel")
    ) {
      return "#FF4545";
    } else {
      return "#53B175";
    }
  };

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.2 }}
      style={{
        width: !isMobile ? "500px" : `${window.screen.width}px`,
        minHeight: "75dvh",
        position: "absolute",
        borderTopRightRadius: "10px",
        borderTopLeftRadius: "10px",
        padding: "1rem",
        backgroundColor: "white",
        bottom: "0px",
        boxShadow: "0px -5px 30px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <VStack w={"full"} align={"start"} spacing={"1rem"}>
        <HStack
          w={"full"}
          justify={"space-between"}
          align={"start"}
          mb={"1rem"}
        >
          <Heading fontSize={"20px"}>Order Status</Heading>
          <StatusCloseButton onClick={props.onClose} />
        </HStack>

        <Stepper
          index={activeStep}
          orientation="vertical"
          gap={"0px"}
          overflowY={"auto"}
          w={"full"}
        >
          {props.orderStatus.map((status, index) => (
            <Step key={index}>
              <OrderStatusIndicator
                index={index}
                currentIndex={activeStep}
                status={status.status}
                key={index}
              />
              <OrderStatusInfo
                status={status.status}
                timestamp={status.createdAt}
                key={index}
              />
              <StepSeparator
                key={index}
                style={{
                  backgroundColor: generateColor(props.orderStatus, index),
                }}
              />
            </Step>
          ))}
        </Stepper>
      </VStack>
    </motion.div>
  );
}
