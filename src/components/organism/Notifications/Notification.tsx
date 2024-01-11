import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { BsCartCheck } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { SlWallet } from "react-icons/sl";

interface NotificationProps {
  type: "orderCreated" | "paymentConfirmed" | "orderDelivered";
  orderNumber: string;
  isRead?: boolean;
}

export default function Notification(props: NotificationProps) {
  const titleText = () => {
    switch (props.type) {
      case "orderCreated":
        return "Your order has been created";
      case "paymentConfirmed":
        return "Your payment has been confirmed";
      case "orderDelivered":
        return "Your order has been delivered";
    }
  };

  const bodyText = () => {
    switch (props.type) {
      case "orderCreated":
        return `Your order #${props.orderNumber} has been created`;
      case "paymentConfirmed":
        return `Your payment #${props.orderNumber} has been confirmed`;
      case "orderDelivered":
        return `Your order #${props.orderNumber} has been delivered`;
    }
  };

  const icon = () => {
    switch (props.type) {
      case "orderCreated":
        return <BsCartCheck size={"30px"} color={"#FBBF24"} />;
      case "paymentConfirmed":
        return <SlWallet size={"30px"} color={"#FBBF24"} />;
      case "orderDelivered":
        return <CiDeliveryTruck size={"35px"} color={"#FBBF24"} />;
    }
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={"white"}
      border={"2px solid #E2E2E2"}
      borderRadius={"10px"}
      padding={"10px"}
      position={"relative"}
    >
      <Text fontSize={"medium"}>{titleText()}</Text>
      <Text fontSize={"small"}>{bodyText()}</Text>
      <Flex alignItems='center' position='absolute' top='10px' right='10px'>
        <Spacer />
        {icon()}
      </Flex>
    </Box>
  );
}
