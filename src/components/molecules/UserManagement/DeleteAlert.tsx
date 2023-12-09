import { Button } from "@chakra-ui/button";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { FocusableElement } from "@chakra-ui/utils";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import {
  deleteAdmin,
  resetDeleteAdminState,
} from "../../../app/redux/slice/Admin/userManagement/deleteAdmin";
import { HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

interface IDeleteAlert {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

export default function DeleteAlert(props: IDeleteAlert) {
  const cancelRef = useRef<FocusableElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const apiState = useSelector(
    (state: RootState) => state.deleteAdmin.apiState
  );
  const apiResp = useSelector((state: RootState) => state.deleteAdmin.resp);
  const toast = useToast();

  const deletehandle = (id: number) => {
    dispatch(deleteAdmin(id));
    props.onClose();
  };

  useEffect(() => {
    if (Object.keys(apiResp).length === 0) return;
    toast({
      duration: 3000,
      status: apiResp.statusCode === 200 ? "success" : "error",
      title: "Admin Deletion",
      description: apiResp.message,
      position: "top",
    });
    if (apiResp.statusCode !== 200) {
      dispatch(resetDeleteAdminState());
    }
  }, [apiState, apiResp, toast, dispatch]);

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color={"red.500"}>
            Delete Admin
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <HStack>
              <Button
                w={"100px"}
                variant={"secondaryButton"}
                onClick={props.onClose}
                isDisabled={apiState === "pending"}
              >
                Cancel
              </Button>
              <Button
                w={"100px"}
                py={"1rem"}
                bg={"red.500"}
                borderColor={"red.500"}
                onClick={() => deletehandle(props.id)}
                isDisabled={apiState === "pending"}
              >
                Delete
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
