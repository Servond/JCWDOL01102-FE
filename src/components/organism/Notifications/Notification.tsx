import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { BsCartCheck } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { SlWallet } from "react-icons/sl";
import { orderStatusConstants } from "../../../data/order/orderStatusConstants";
import { DateTime } from "luxon";
import { FaCreativeCommonsNc, FaHandHolding } from "react-icons/fa6";
import { TbBoxOff } from "react-icons/tb";
import { IoMdDoneAll } from "react-icons/io";
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
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate(`/order/${props.orderNumber}`);
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
        return (
          <Icon
            as={BsCartCheck}
            width={"35px"}
            height={"35px"}
            color={"#FBBF24"}
          />
        );
      case orderStatusConstants.payment_success.code:
        return (
          <Icon
            as={SlWallet}
            width={"35px"}
            height={"35px"}
            color={"primaryColor"}
          />
        );
      case orderStatusConstants.payment_failed.code:
        return (
          <Icon
            as={FaCreativeCommonsNc}
            width={"35px"}
            height={"35px"}
            color={"errorColor"}
          />
        );
      case orderStatusConstants.shipped.code:
        return (
          <Icon
            as={CiDeliveryTruck}
            width={"35px"}
            height={"35px"}
            color={"primaryColor"}
          />
        );
      case orderStatusConstants.canceled.code:
        return (
          <Icon
            as={TbBoxOff}
            width={"35px"}
            height={"35px"}
            color={"errorColor"}
          />
        );
      case orderStatusConstants.received.code:
        return (
          <Icon
            as={FaHandHolding}
            width={"35px"}
            height={"35px"}
            color={"#FBBF24"}
          />
        );
      case orderStatusConstants.done.code:
        return (
          <Icon
            as={IoMdDoneAll}
            width={"35px"}
            height={"35px"}
            color={"primaryColor"}
          />
        );
      default:
        return (
          <Icon
            as={BsCartCheck}
            width={"35px"}
            height={"35px"}
            color={"#FBBF24"}
          />
        );
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
      paddingRight={"50px"}
      cursor={"pointer"}
      onClick={handleDetail}
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
