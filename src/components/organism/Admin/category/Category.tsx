/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Divider,
  GridItem,
  HStack,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import {
  deleteCategoryById,
  updateCategory,
} from "../../../../api/admin/category";

interface Props {
  id: number;
  name: string;
  totalItem: number;
  setRefresh: () => void;
}

export default function Category(props: Props) {
  const [name, setName] = React.useState(props.name);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [updateButton, setUpdateButton] = React.useState("Ubah");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const handleUpdate = async () => {
    if (isUpdate) {
      setIsLoading(true);
      try {
        const response = await updateCategory(props.id, name);
        toast({
          title: "Success Adding Category",
          description: response.data.message,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        props.setRefresh();
        setIsLoading(false);
        setUpdateButton("Ubah");
      } catch (error: any) {
        toast({
          title: "Failed Adding Category",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setUpdateButton("Ubah");
        setIsLoading(false);
        props.setRefresh();
      }
    } else {
      setUpdateButton("Simpan");
    }
    setIsUpdate(!isUpdate);
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCategoryById(props.id);
      toast({
        title: "Success deleting category",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      props.setRefresh();
    } catch (error: any) {
      toast({
        title: "Failed deleting category",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      props.setRefresh();
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <GridItem colSpan={3}>
        <Divider />
      </GridItem>
      <GridItem colSpan={1}>
        <Text display={isUpdate ? "none" : "block"}>{name}</Text>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          display={isUpdate ? "block" : "none"}
        />
      </GridItem>
      <GridItem colSpan={1} margin={"0 auto"}>
        <Text>{props.totalItem}</Text>
      </GridItem>
      <GridItem colSpan={1} margin={"0 auto"}>
        <HStack>
          <Button
            colorScheme={"red"}
            variant={"outline"}
            height={"30px"}
            isDisabled={isUpdate || props.totalItem > 0 ? true : false}
            onClick={onOpen}
          >
            Hapus
          </Button>
          <Button
            colorScheme={"green"}
            variant={"outline"}
            height={"30px"}
            onClick={handleUpdate}
            isLoading={isLoading}
          >
            {updateButton}
          </Button>
        </HStack>
      </GridItem>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleDelete();
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
