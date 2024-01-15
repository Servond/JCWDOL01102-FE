/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Stack, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";
import Notification from "../../components/organism/Notifications/Notification";
import { useEffect, useState } from "react";
import { getNotification } from "../../api/order";
import { INotification } from "../../data/order.interface";
import LoadingCenter from "../../components/molecules/Loading";

export default function NotificationPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [page, setPage] = useState(1);
  const toast = useToast();
  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const result = await getNotification(page, 10);
      setIsLoading(false);
      setNotifications([...notifications, ...result.data.data.data.data]);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Gagal memuat data",
        description: "Silahkan coba lagi",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    handleLoadMore();
    setPage(1);
  }, [page]);

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
          {isLoading && <LoadingCenter />}
        </Stack>
      </VStack>
    </>
  );
}
