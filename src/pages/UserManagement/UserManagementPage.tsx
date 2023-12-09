import { VStack } from "@chakra-ui/react";
import AdminTableHeader from "../../components/organism/UserMangement/AdminTableHeader";
import AdminTableContent from "../../components/organism/UserMangement/AdminTableContent";

export default function UserManagementPage() {
  return (
    <VStack w={"full"}>
      <AdminTableHeader />
      <AdminTableContent />
    </VStack>
  );
}
