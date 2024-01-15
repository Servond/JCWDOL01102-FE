/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../../api/admin/product";
import { useRef } from "react";
interface Props {
  id: number;
  name: string;
  refresh: () => void;
}
export default function ProductAction(props: Props) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  const handleEdit = () => {
    navigate(`/dashboard/update-product/${props.id}`);
  };
  const handleDelete = async () => {
    try {
      await deleteProduct(props.id);
      toast({
        title: `Berhasil menghapus ${props.name}`,
        // description: "Stok berhasil diubah",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      props.refresh();
      onClose();
    } catch (error: any) {
      toast({
        title: "Gagal menghapus item",
        description: error?.response?.data?.message ?? "Terjadi kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <>
      <HStack>
        <Button variant={"dashboardRejectButton"} onClick={onOpen}>
          Hapus
        </Button>
        <Button variant={"dashboardAccepButton"} onClick={handleEdit}>
          Ubah
        </Button>
      </HStack>
      <AlertDialog
        motionPreset='slideInBottom'
        onClose={onClose}
        leastDestructiveRef={cancelRef!}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            Hapus {props.name} dari daftar produk?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Data yang telah dihapus tidak dapat dikembalikan.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              variant={"dashboardAccepButton"}
              ref={cancelRef}
              onClick={onClose}
            >
              Batal
            </Button>
            <Button
              variant={"dashboardDeleteButton"}
              colorScheme='red'
              ml={3}
              onClick={handleDelete}
            >
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
