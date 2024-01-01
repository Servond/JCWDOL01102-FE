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
  const cancelRef = useRef<HTMLButtonElement | null>(null);
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
        <AlertDialogContent p={"1rem"}>
          <AlertDialogBody>
            <VStack spacing={"8px"}>
              <Container w={"250px"} mb={"1rem"} >
                <Image src={locationSvg} />
              </Container>
              <Heading size={"md"} textAlign={"center"}>
                hmmm..looks like we can't <br/> access your location.
              </Heading>
              <Text color={"secondaryColor"} textAlign={"center"}>Please make sure the browser permission for location is allowed</Text>
            </VStack>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
