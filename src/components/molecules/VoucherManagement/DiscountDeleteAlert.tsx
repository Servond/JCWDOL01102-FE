import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import deleteSvg from "../../../assets/delete.svg";
import { DiscountType } from "../../../data/constants";
import { useDispatch, useSelector } from "react-redux";
import { deleteVoucher } from "../../../app/redux/slice/Admin/discount/deleteVoucher";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { deletePromotion } from "../../../app/redux/slice/Admin/discount/deletePromotion";
import Loading from "../../atoms/Loading";

interface IDiscountAlertProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  discountType: DiscountType;
}

export default function DiscountDeleteAlert(props: IDiscountAlertProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const deleteVoucherState = useSelector(
    (state: RootState) => state.deleteVoucher.apiState
  );
  const deletePromotionState = useSelector(
    (state: RootState) => state.deletePromotoin.apiState
  );
  const dispatch = useDispatch<AppDispatch>();
  const onDelete = () => {
    if (props.discountType === DiscountType.VOUCHER) {
      dispatch(deleteVoucher(props.id));
    } else {
      dispatch(deletePromotion(props.id));
    }
    // props.onClose();
  };
  useEffect(() => {
    if (deletePromotionState === "idle" && deleteVoucherState === "idle") {
      return;
    }
    props.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletePromotionState, deleteVoucherState]);
  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent p={"1rem"} borderRadius={"10px"}>
          <AlertDialogBody>
            <VStack spacing={"2rem"}>
              <Container w={"300px"}>
                <Image src={deleteSvg} />
              </Container>
              <Heading size={"md"} textAlign={"center"}>
                Are you sure you want to delete this
                {props.discountType === DiscountType.VOUCHER
                  ? " voucher"
                  : " promotion"}
                ?
              </Heading>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter mt={"1rem"}>
            {deleteVoucherState === "pending" ||
            deletePromotionState === "pending" ? (
              <Flex w={"full"} justify={"center"} align={"center"}>
                <Loading />
              </Flex>
            ) : (
              <HStack w={"full"} justify={"center"}>
                <Button
                  minW={"100px"}
                  w={"full"}
                  variant={"primaryButton"}
                  py={"1rem"}
                  ref={cancelRef}
                  onClick={props.onClose}
                >
                  No
                </Button>
                <Button
                  w={"full"}
                  minW={"100px"}
                  bg={"errorColor"}
                  py={"1rem"}
                  onClick={onDelete}
                >
                  Yes
                </Button>
              </HStack>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
