import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RefObject, useRef, useState } from "react";
import { orderStatusConstants } from "../../../data/order/orderStatusConstants";
import {
  cancelOrder,
  updateOrderStatus,
} from "../../../api/admin/order-management";

interface SendOrderOptionProps {
  id: number;
  refresh: () => void;
}

export default function SendOrderOption({ id, refresh }: SendOrderOptionProps) {
  const cancelRef: RefObject<HTMLButtonElement> = useRef(null);
  const cancelRejectRef: RefObject<HTMLButtonElement> = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const toast = useToast();
  const handleSend = async () => {
    try {
      setIsLoading(true);
      await updateOrderStatus(id, orderStatusConstants.shipped.code);
      setIsLoading(false);
      refresh();
      onClose();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Gagal mengirim pesanan",
        description: "Silahkan coba lagi",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleReject = async () => {
    try {
      setIsLoading(true);
      await cancelOrder(id);
      setIsLoading(false);
      refresh();
      onCloseDelete();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Gagal membatalkan pesanan",
        description: "Silahkan coba lagi",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <HStack width={"fit-content"}>
        <Button
          variant={"dashboardAccepButton"}
          onClick={onOpen}
          disabled={isLoading}
        >
          Kirim{" "}
        </Button>
        <Button
          variant={"dashboardRejectButton"}
          onClick={onOpenDelete}
          disabled={isLoading}
        >
          Batalkan{" "}
        </Button>
      </HStack>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Kirim Pesanan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin ingin mengirim pesanan ini?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                variant={"dashboardRejectButton"}
                onClick={onClose}
              >
                Batal
              </Button>
              <Button
                variant={"dashboardAccepButton"}
                onClick={handleSend}
                ml={3}
              >
                Kirim
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRejectRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Batalkan Pesanan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin ingin membatalkan pesanan ini?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                variant={"dashboardAccepButton"}
                ref={cancelRejectRef}
                onClick={onCloseDelete}
              >
                Batal
              </Button>
              <Button
                onClick={handleReject}
                variant={"dashboardDeleteButton"}
                ml={3}
              >
                Batalkan
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
