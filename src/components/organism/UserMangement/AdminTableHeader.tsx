import { Flex } from "@chakra-ui/react";
import ButtonGroup from "../../molecules/UserManagement/ButtonGroup";
import AdminCounter from "../../molecules/UserManagement/AdminCounter";

export default function AdminTableHeader() {
  return (
    <Flex w={"full"} justify={"space-between"}>
      <AdminCounter />
      <ButtonGroup />
    </Flex>
  );
}
