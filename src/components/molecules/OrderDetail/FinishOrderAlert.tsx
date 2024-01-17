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
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import complete from "../../../assets/complete.jpg";
import { updateOrderStatusById } from "../../../app/redux/slice/OrderStatus/OrderStatus";

interface IFinishOrderAlertProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
}

export default function FinishOrderAlert(props: IFinishOrderAlertProps) {
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
  const onFinish = () => {
    props.onClose();
    dispatch(updateOrderStatusById({ status: "done", orderId: props.orderId }));
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
              <Heading size={"md"} textAlign={"center"}>
                Are you sure you want to finish this order?
              </Heading>
              <Container w={"200px"}>
                <Image src={complete} />
              </Container>
              <VStack>
                <Text
                  fontWeight={"semibold"}
                  fontSize={"16px"}
                  textAlign={"center"}
                >
                  Please make sure your groceries match your order
                </Text>
              </VStack>
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
