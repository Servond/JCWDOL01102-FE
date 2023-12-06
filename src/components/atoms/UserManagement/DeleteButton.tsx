import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";

interface IDeleteButtonProps {
  id?: number | undefined;
}

export default function DeleteButton(props: IDeleteButtonProps) {
  return (
    <Button
      variant={"secondaryButton"}
      borderColor={"red.500"}
      color={"red.500"}
      onClick={() => console.log(props.id)}
    >
      <HStack>
        <Box fontSize={"16px"}>
          <FaTrash />
        </Box>
        <Text fontWeight={"bold"}>Delete</Text>
      </HStack>
    </Button>
  );
}
