import { Card } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export default function DashboardContent() {
  return (
    <Card
      flexGrow={"1"}
      h={"full"}
      p={"12px"}
      borderRadius={"10px"}
      shadow={"xl"}
      ml={"1rem"}
      overflow={"auto"}
    >
      <Outlet />
    </Card>
  );
}
