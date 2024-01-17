import { Box, Heading, VStack } from "@chakra-ui/react";
import { MdDashboard } from "react-icons/md";

export default function DashboardLogo() {
  return (
    <VStack>
      <Box fontSize={"40px"} color={"primaryColor"}>
        <MdDashboard />
      </Box>
      <Heading size={"md"} color={"primaryColor"}>
        Dashboard
      </Heading>
    </VStack>
  );
}
