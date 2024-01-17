/* eslint-disable react-hooks/exhaustive-deps */
import {
  Center,
  Divider,
  Spacer,
  Stack,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNotification } from "../../api/order";
import LoadingCenter from "../../components/molecules/Loading";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";
import Paginate from "../../components/molecules/Paginate";
import Notification from "../../components/organism/Notifications/Notification";
import { INotification } from "../../data/order.interface";

export default function NotificationPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [totalPage, setTotalPage] = useState(-1);
  const [page, setPage] = useState(1);
  const toast = useToast();
  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const result = await getNotification(page, 5);
      setIsLoading(false);
      setNotifications(result.data.data.data);
      setTotalPage(result.data.data.totalPages);
    } catch (error) {
      console.error(error);
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
  }, [page]);

  return (
    <>
      <VStack gap={"10px"} height={"calc(100dvh - 80px)"}>
        <TitleHeader title={"Notifications"} callback={handleBack} />
        <Divider />

        <Stack spacing={"5px"} width={"100%"} height={"100%"}>
          {notifications.length > 0 &&
            notifications.map((notification, index) => {
              return (
                <Notification
                  key={index}
                  type={notification.status}
                  orderNumber={notification.order.invoiceNo}
                  timestamp={notification.createdAt}
                  isRead={true}
                />
              );
            })}
          {isLoading && <LoadingCenter />}
          <Spacer />
          <Center>
            <Paginate
              pageCount={totalPage}
              forcePage={page - 1}
              onPageChange={(selectedItem) => {
                setPage(selectedItem.selected + 1);
              }}
            />
          </Center>
        </Stack>
      </VStack>
    </>
  );
}
