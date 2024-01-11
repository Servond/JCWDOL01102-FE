import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  Container,
  Heading,
  Image,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useRef } from "react";
import locationSvg from "../../../assets/location.svg";

interface ILocationPermissionAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationPermissionAlert(
  props: ILocationPermissionAlertProps
) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const calculateWidth = (isMobile: boolean) => {
    if (!isMobile) {
      return "calc(500px - 10%)";
    } else {
      return `calc(${window.screen.width}px - 10%)`;
    }
  };
  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={cancelRef}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent p={"1rem"} w={calculateWidth(isMobile)}>
          <AlertDialogBody>
            <VStack spacing={"8px"}>
              <Container w={"250px"} mb={"1rem"}>
                <Image src={locationSvg} />
              </Container>
              <Heading size={"md"} textAlign={"center"}>
                hmmm..looks like we can't <br /> access your location.
              </Heading>
              <Text color={"secondaryColor"} textAlign={"center"}>
                Please make sure the browser permission for location is allowed
              </Text>
            </VStack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
