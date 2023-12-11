import { Heading, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import Stats from "../../components/molecules/Report/Stats";
import { Role } from "../../data/constants";

export default function ReportPage() {
  const userRole = useSelector((state: RootState) => state.login.role);
  return (
    <VStack>
      <Stats />
      <Heading>
        {userRole === Role.SUPER_ADMIN
          ? "Report Super Admin"
          : "Report Store Admin"}
      </Heading>
    </VStack>
  );
}
