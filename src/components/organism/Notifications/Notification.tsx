import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { BsCartCheck } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { SlWallet } from "react-icons/sl";
import { orderStatusConstants } from "../../../data/order/orderStatusConstants";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";

interface NotificationProps {
  type: string;
  orderNumber: string;
  timestamp?: string;
  isRead?: boolean;
}

export default function Notification(props: NotificationProps) {
  const titleText = () => {
    switch (props.type) {
      case orderStatusConstants.created.code:
        return "Your order has been created";
      case orderStatusConstants.payment_success.code:
        return "Your payment has been confirmed";
      case orderStatusConstants.payment_failed.code:
        return "Your payment has been failed";
      case orderStatusConstants.shipped.code:
        return "Your order has been delivered";
      case orderStatusConstants.canceled.code:
        return "Your order has been canceled";
      case orderStatusConstants.received.code:
        return "Your order has been received";
      case orderStatusConstants.done.code:
        return "Your order has been done";
      case orderStatusConstants.process.code:
        return "Your order has been process";
      default:
        return "Your order has been created";
    }
  };

  const convertDate = (time: string) => {
    return DateTime.fromISO(time).toLocaleString(DateTime.DATETIME_MED);
  };

  const bodyText = () => {
    switch (props.type) {
      case orderStatusConstants.created.code:
        return `Your order ${
          props.orderNumber
        } has been created at ${convertDate(props.timestamp!)}`;
      case orderStatusConstants.payment_success.code:
        return `Your payment ${
          props.orderNumber
        } has been confirmed at ${convertDate(props.timestamp!)}`;
      case orderStatusConstants.payment_failed.code:
        return `Your payment ${
          props.orderNumber
        } has been failed at ${convertDate(props.timestamp!)}`;
      case orderStatusConstants.shipped.code:
        return `Your order ${
          props.orderNumber
        } has been delivered at ${convertDate(props.timestamp!)}`;
      case orderStatusConstants.canceled.code:
        return `Your order ${
          props.orderNumber
        } has been canceled at ${convertDate(props.timestamp!)}`;
      case orderStatusConstants.received.code:
        return `Your order ${
          props.orderNumber
        } has been received at ${convertDate(props.timestamp!)}`;
      case orderStatusConstants.done.code:
        return `Your order ${props.orderNumber} has been done at ${convertDate(
          props.timestamp!
        )}`;
      case orderStatusConstants.process.code:
        return `Your order ${
          props.orderNumber
        } has been process at ${convertDate(props.timestamp!)}`;
      default:
        return `Your order ${
          props.orderNumber
        } has been created at ${convertDate(props.timestamp!)}`;
    }
  };

  const icon = () => {
    switch (props.type) {
      case orderStatusConstants.created.code:
        return <BsCartCheck size={"30px"} color={"#FBBF24"} />;
      case orderStatusConstants.payment_success.code:
        return <SlWallet size={"30px"} color={"#FBBF24"} />;
      case orderStatusConstants.payment_failed.code:
        return <CiDeliveryTruck size={"35px"} color={"#FBBF24"} />;
      default:
        return <BsCartCheck size={"30px"} color={"#FBBF24"} />;
    }
  };

  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/order/${props.orderNumber}`);
  };
  return (
    <Box
      width={"100%"}
      backgroundColor={"white"}
      border={"2px solid #E2E2E2"}
      borderRadius={"10px"}
      padding={"10px"}
      position={"relative"}
      paddingRight={"50px"}
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Text fontSize={"medium"}>{titleText()}</Text>
      <Text fontSize={"small"}>{bodyText()}</Text>
      <Flex alignItems="center" position="absolute" top="10px" right="10px">
        <Spacer />
        {icon()}
      </Flex>
    </Box>
  );
}
