import { Divider, HStack, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

export default function AdminCounter() {
  const adminCount = useSelector(
    (state: RootState) => state.userManagement.adminTotal
  );
  const apiState = useSelector(
    (state: RootState) => state.userManagement.apiState
  );
  return (
    <HStack>
      <Text fontSize={"20px"} fontWeight={"bold"}>
        Admin
      </Text>
      <Divider
        orientation="vertical"
        h={"60%"}
        borderColor={"secondaryColor"}
      />
      <Text fontSize={"16px"} color={"secondaryColor"}>
        {apiState === "pending" ? "Counting... " : adminCount}
      </Text>
    </HStack>
  );
}
