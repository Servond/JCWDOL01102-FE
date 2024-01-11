import { Box, HStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import DiscountDeleteAlert from "./DiscountDeleteAlert";
import { DiscountType } from "../../../data/constants";

interface IActionButtonProps {
  id: number;
  discountType: DiscountType;
}

export default function ActionButton(props: IActionButtonProps) {
  const deleteAlertDisclosure = useDisclosure();
  const onDelete = () => {
    deleteAlertDisclosure.onOpen();
  };

  return (
    <HStack>
      <DiscountDeleteAlert
        isOpen={deleteAlertDisclosure.isOpen}
        onClose={deleteAlertDisclosure.onClose}
        id={props.id}
        discountType={props.discountType}
      />
      <IconButton
        aria-label=""
        bg={"errorColor"}
        borderRadius={"full"}
        onClick={onDelete}
        icon={
          <Box>
            <MdDelete />
          </Box>
        }
      />

      <IconButton
        aria-label=""
        borderRadius={"full"}
        icon={
          <Box>
            <MdEdit />
          </Box>
        }
      />
    </HStack>
  );
}
