import { Card, Divider, VStack } from "@chakra-ui/react";
import DashboardMenuItemList from "../../molecules/Dashboard/DashboardMenuItemList";
import DashboardLogo from "../../atoms/Dashboard/DashboardLogo";

export default function DashboardNavBar() {
  return (
    <Card minW={"250px"} shadow={"xl"} p={"12px"} borderRadius={"10px"}>
      <VStack as={"nav"} w={"full"} spacing={"20px"}>
        <DashboardLogo />
        <Divider borderColor={"secondaryColor"} />
        <DashboardMenuItemList />
      </VStack>
    </Card>
  );
}
