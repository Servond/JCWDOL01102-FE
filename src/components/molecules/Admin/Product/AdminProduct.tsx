/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  GridItem,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../../../api/admin/product";

interface AdminProductItemProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
  refresh: () => void;
}

export default function AdminProductItem(props: AdminProductItemProps) {
  const toast = useToast();
  const navigate = useNavigate();
  const [price, setPrice] = useState(props.price);
  const [stock, setStock] = useState(props.stock);

  useEffect(() => {
    setPrice(props.price);
    setStock(props.stock);
  }, [props.price, props.stock]);

  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <AlertDialog
        motionPreset='slideInBottom'
        onClose={onClose}
        leastDestructiveRef={cancelRef!}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Delete item?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this item? You can't undo this
            action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' ml={3} onClick={handleDelete}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <GridItem colSpan={5} cursor={"pointer"}>
        <HStack>
          <Image
            as={"img"}
            crossOrigin={"anonymous"}
            src={props.imageUrl}
            w={"75px"}
            h={"75px"}
            borderRadius={"5px"}
            objectFit={"contain"}
          />
          <Text
            fontWeight={"bold"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            title={props.name}
          >
            {props.name}
          </Text>
        </HStack>
      </GridItem>
      <GridItem colSpan={3}>
        <Center h={"100%"}>
          <Text>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(price)}
          </Text>
          <Spacer />
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Center h={"100%"}>
          <Text>{stock}</Text>
          <Spacer />
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Center h={"100%"}>
          <Text>{props.category}</Text>
          <Spacer />
        </Center>
      </GridItem>

      <GridItem colSpan={2}>
        <Center h={"100%"}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} w={"100px"}>
              Aksi
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleEdit}>Edit</MenuItem>
              <MenuItem onClick={onOpen}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Center>
      </GridItem>
    </>
  );
}
