import { AbsoluteCenter, Container, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Role } from "../../data/constants";

export default function ReportPage() {
  const userRole = useSelector((state: RootState) => state.login.role);
  return (
    <Container>
      <AbsoluteCenter>
        <Text>
          {userRole === Role.BRANCH_ADMIN
            ? "INI LAPORAN SUPER ADMIN"
            : "INI LAPORAN BRANCH ADMIN"}
        </Text>
      </AbsoluteCenter>
    </Container>
  );
}
