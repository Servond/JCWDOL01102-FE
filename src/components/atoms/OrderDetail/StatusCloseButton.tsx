import { Box } from "@chakra-ui/react";
import { MdClose } from "react-icons/md";

interface IStatusCloseButtonProps {
  onClick: () => void;
}

export default function StatusCloseButton(props: IStatusCloseButtonProps) {
  return (
    <Box
      color={"black"}
      fontSize={"20px"}
      _hover={{ cursor: "pointer" }}
      onClick={props.onClick}
    >
      <MdClose />
    </Box>
  );
}
