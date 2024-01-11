import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { PiSignOut } from "react-icons/pi";
import LogoutAlert from "../../molecules/Dashboard/LogoutAlert";

export default function LogoutButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display={"grid"} placeItems={"center"} width={"100%"} mt={"35px"}>
      <LogoutAlert isOpen={isOpen} onClose={onClose} />
      <Button
        leftIcon={<PiSignOut />}
        width={"90%"}
        mx={"auto"}
        onClick={onOpen}
      >
        Log Out
      </Button>
    </Box>
  );
}
