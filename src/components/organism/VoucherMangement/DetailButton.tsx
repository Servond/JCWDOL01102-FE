import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import ProductCheckboxesModal from "./ProductCheckboxesModal";
import { FaRegSquareCheck } from "react-icons/fa6";

interface IDetailButton {
  voucherId: number;
}

export default function DetailButton(props: IDetailButton) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Button variant={"secondaryButton"} onClick={onOpen}>
        <HStack>
          <Box>
            <FaRegSquareCheck />
          </Box>
          <Text>Details</Text>
        </HStack>
      </Button>
      <ProductCheckboxesModal
        isOpen={isOpen}
        onClose={onClose}
        voucherId={props.voucherId}
      />
    </>
  );
}
