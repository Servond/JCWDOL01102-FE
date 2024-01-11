import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import LogoutAlert from "./LogoutAlert";

export default function DashboardNavBarFooter() {
  const disclosure = useDisclosure();
  return (
    <VStack w={"full"}>
      <LogoutAlert isOpen={disclosure.isOpen} onClose={disclosure.onClose} />
      <Button bg={"errorColor"} w={"full"} onClick={disclosure.onOpen}>
        <HStack>
          <Box color={"white"} fontSize={"20px"}>
            <MdLogout />
          </Box>
          <Text>Log Out</Text>
        </HStack>
      </Button>
    </VStack>
  );
}
