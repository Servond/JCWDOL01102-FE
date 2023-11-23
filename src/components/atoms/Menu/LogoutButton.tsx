import { Box, Button } from "@chakra-ui/react";
import { PiSignOut } from "react-icons/pi";

export default function LogoutButton() {
  return (
    <Box display={"grid"} placeItems={"center"} width={"100%"} mt={"35px"}>
      <Button
        leftIcon={<PiSignOut />}
        width={"90%"}
        mx={"auto"}
        color={"primaryColor"}
      >
        Log Out
      </Button>
    </Box>
  );
}
