import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import Loading from "../../atoms/Loading";
import { IAppModalProps } from "../../../data/interfaces";

export default function RedirectLoading(props: IAppModalProps) {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <VStack>
            <Loading color="primaryColor" trackColor="thirdColor" />
            <Heading size={"md"} fontWeight={"semibold"}>
              Redirecting
            </Heading>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
