import {
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import CheckboxGroup from "./CheckboxGroup";

interface IFilterModalProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function FilterModal(props: IFilterModalProps) {
  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalContent p={"1rem"}>
        <ModalBody>
          <Heading fontSize={"25px"} mb={"1.3rem"}>
            Filter
          </Heading>
          <VStack w={"full"} spacing={"1rem"}>
            <CheckboxGroup />
            <CheckboxGroup />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
