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
import {
  cancelOrder,
  updateOrderStatus,
} from "../../../api/admin/order-management";
import { orderStatusConstants } from "../../../data/order/orderStatusConstants";

interface OrderActionProps {
  id: number;
  refresh: () => void;
}

export default function AcceptOrderOption({ id, refresh }: OrderActionProps) {
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
  const handleAccept = async () => {
    try {
      setIsLoading(true);
      await updateOrderStatus(id, orderStatusConstants.process.code);
      setIsLoading(false);
      refresh();
      onClose();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Gagal menerima pesanan",
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
          Terima
        </Button>
        <Button
          variant={"dashboardRejectButton"}
          onClick={onOpenDelete}
          disabled={isLoading}
        >
          Tolak
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
              Terima Pesanan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin ingin menerima pesanan ini?
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
                onClick={handleAccept}
                ml={3}
              >
                Terima
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
              Tolak Pesanan
            </AlertDialogHeader>

            <AlertDialogBody>
              Apakah anda yakin ingin menolak pesanan ini?
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
                Tolak
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
