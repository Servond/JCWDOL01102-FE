import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import cancel from "../../../assets/cancel.svg";
import { cancelOrderById } from "../../../app/redux/slice/OrderStatus/CancelOrder";

interface IFinishOrderAlertProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

export default function CancelOrderAlert(props: IFinishOrderAlertProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const calculateWidth = (isMobile: boolean) => {
    if (!isMobile) {
      return "calc(500px - 10%)";
    } else {
      return `calc(${window.screen.width}px - 10%)`;
    }
  };
  const dispatch = useDispatch<AppDispatch>();
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  const onFinish = () => {
    props.onClose();
    dispatch(
      cancelOrderById({
        orderId: props.orderId,
        branchId: branchId
          ? Number(branchId)
          : JSON.parse(localStorage.getItem("branch")).id,
        status: "",
      })
    );
  };
  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent p={"1rem"} w={calculateWidth(isMobile)}>
          <AlertDialogBody>
            <VStack spacing={"2rem"}>
              <Container w={"200px"}>
                <Image src={cancel} />
              </Container>
              <Heading size={"md"} textAlign={"center"}>
                Are you sure you want to Cancel this order?
              </Heading>
            </VStack>
          </AlertDialogBody>

          <AlertDialogFooter mt={"1rem"}>
            <HStack w={"full"} justify={"center"}>
              <Button
                minW={"100px"}
                w={"full"}
                variant={"primaryButton"}
                bg={"errorColor"}
                py={"1rem"}
                ref={cancelRef}
                onClick={props.onClose}
              >
                No
              </Button>
              <Button w={"full"} minW={"100px"} py={"1rem"} onClick={onFinish}>
                Yes
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
