import { Divider, Stack, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";
import Notification from "../../components/organism/Notifications/Notification";

export default function NotificationPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <VStack gap={"10px"}>
        <TitleHeader title={"Notifications"} callback={handleBack} />
        <Divider />

        <Stack spacing={"5px"} width={"100%"}>
          <Notification type='orderDelivered' orderNumber={"123456789"} />
          <Notification type='paymentConfirmed' orderNumber={"123456789"} />
          <Notification
            type='orderCreated'
            orderNumber={"123456789"}
            isRead={true}
          />
        </Stack>
      </VStack>
    </>
  );
}
