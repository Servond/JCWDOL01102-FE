/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
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
export default function CategoryAction(props: Props) {
  const [name, setName] = useState(props.name);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await updateCategory(props.id, name);
      toast({
        title: "Success Adding Category",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      props.setRefresh();
      setIsLoading(false);
      onCloseUpdate();
    } catch (error: any) {
      toast({
        title: "Failed Adding Category",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
      props.setRefresh();
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCategoryById(props.id);
      toast({
        title: "Success Deleting Category",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      props.setRefresh();
    } catch (error: any) {
      toast({
        title: "Failed Deleting Category",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      props.setRefresh();
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const cancelUpdateRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <HStack>
        <Button
          variant={"dashboardRejectButton"}
          height={"30px"}
          isDisabled={isUpdate || props.totalItem > 0 ? true : false}
          onClick={onOpen}
        >
          Hapus
        </Button>
        <Button
          variant={"dashboardAccepButton"}
          height={"30px"}
          onClick={() => {
            setIsUpdate(true);
            onOpenUpdate();
          }}
          isLoading={isLoading}
        >
          Ubah
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
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                variant={"dashboardAccepButton"}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleDelete();
                  onClose();
                }}
                ml={3}
                variant={"dashboardDeleteButton"}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpenUpdate}
        leastDestructiveRef={cancelUpdateRef}
        onClose={onCloseUpdate}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Update Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Please input new category name
              <Input
                my={3}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onCloseUpdate}
                variant={"dashboardRejectButton"}
              >
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleUpdate();
                  onCloseUpdate;
                }}
                ml={3}
                variant={"dashboardAccepButton"}
              >
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
