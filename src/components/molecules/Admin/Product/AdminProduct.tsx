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
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { deleteProduct, updateProduct } from "../../../../api/admin/product";

interface AdminProductItemProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  refresh: () => void;
}

export default function AdminProductItem(props: AdminProductItemProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [lastStock, setLastStock] = useState(props.stock);
  const toast = useToast();
  const handleBlurStock = async (e: React.FocusEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      if (parseInt(e.target.value) === lastStock) {
        setIsLoading(false);
        return;
      }
      await updateProduct(props.id, {
        [e.target.name]: parseInt(e.target.value),
      });
      toast({
        title: `Berhasil mengubah ${e.target.name}`,
        // description: "Stok berhasil diubah",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setLastStock(parseInt(e.target.value));
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Gagal mengubah stok",
        description: error.response.data.message ?? "Terjadi kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <InputGroup>
            <InputLeftAddon children={"Rp"} />
            <Input
              type={"number"}
              defaultValue={props.price}
              onBlur={handleBlurStock}
              name='price'
              isDisabled={isLoading}
            />
          </InputGroup>
          <Spacer />
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Center h={"100%"}>
          <Input
            name='stock'
            type={"number"}
            defaultValue={props.stock}
            placeholder='Masukan jumlah stok'
            onBlur={handleBlurStock}
            isDisabled={isLoading}
          />
          <Spacer />
        </Center>
      </GridItem>
      <GridItem colSpan={2}>
        <Center h={"100%"}>
          <Text>{"sayur"}</Text>
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
              <MenuItem>Edit</MenuItem>
              <MenuItem onClick={onOpen}>Delete</MenuItem>
            </MenuList>
          </Menu>
        </Center>
      </GridItem>
    </>
  );
}
