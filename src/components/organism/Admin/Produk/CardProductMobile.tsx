/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../api/admin/product";

interface Props {
  name: string;
  price: number;
  stock: number;
  image: string;
  id: number;
  refresh: () => void;
}

export default function CardProductMobile(props: Props) {
  const navigate = useNavigate();
  const onUpdate = () => {
    navigate(`/dashboard/update-product/${props.id}`);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Hapus Produk
            </AlertDialogHeader>

            <AlertDialogBody>
              {`Apakah anda yakin ingin menghapus produk ${props.name}?`}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Batal
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                ya
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Card width={"100%"}>
        <CardBody padding={"10px"}>
          <HStack>
            <Image
              as={"img"}
              src={props.image}
              borderRadius={"15px"}
              crossOrigin='anonymous'
              width={"75px"}
              height={"75px"}
              objectFit={"fill"}
            />
            <VStack width={"100%"} ml={"15px"}>
              <Text
                fontSize={"small"}
                fontWeight={"bold"}
                textAlign={"left"}
                color={"gray.800"}
                width={"100%"}
                lineHeight={1}
              >
                {props.name}
              </Text>
              <Text
                fontSize={"small"}
                color={"gray.800"}
                textAlign={"left"}
                width={"100%"}
                lineHeight={1}
              >
                {`${new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(props.price)}
                    `}
              </Text>
              <Text
                fontSize={"small"}
                color={"gray.800"}
                textAlign={"left"}
                width={"100%"}
                lineHeight={1}
              >
                {`Stok: ${props.stock}`}
              </Text>
            </VStack>
          </HStack>
          <HStack justifyContent={"center"} mt={"1rem"}>
            <Button
              colorScheme={"red"}
              mx={"5px"}
              variant={"outline"}
              width={"40%"}
              height={"25px"}
              onClick={onOpen}
            >
              Hapus
            </Button>
            <Button
              colorScheme={"green"}
              mx={"5px"}
              variant={"outline"}
              width={"40%"}
              height={"25px"}
              onClick={onUpdate}
            >
              Ubah
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </>
  );
}
