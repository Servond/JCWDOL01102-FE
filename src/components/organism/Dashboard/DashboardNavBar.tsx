import { Card, Divider, VStack } from "@chakra-ui/react";
import DashboardMenuItemList from "../../molecules/Dashboard/DashboardMenuItemList";
import DashboardLogo from "../../atoms/Dashboard/DashboardLogo";
import DashboardNavBarFooter from "../../molecules/Dashboard/DashboardNavBarFooter";

export default function DashboardNavBar() {
  return (
    <Card minW={"250px"} shadow={"xl"} p={"12px"} borderRadius={"10px"}>
      <VStack w={"full"} h={"full"} justify={"space-between"}>
        <VStack as={"nav"} w={"full"} spacing={"20px"}>
          <DashboardLogo />
          <Divider borderColor={"secondaryColor"} />
          <DashboardMenuItemList />
        </VStack>
        <DashboardNavBarFooter />
      </VStack>
    </Card>
  );
}
