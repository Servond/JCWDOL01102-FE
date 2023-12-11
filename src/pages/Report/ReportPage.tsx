import { AbsoluteCenter, Container, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Role } from "../../data/constants";
import Stats from "../../components/molecules/Report/Stats";

export default function ReportPage() {
  const userRole = useSelector((state: RootState) => state.login.role);
  return (
    <VStack>
      <Stats />
    </VStack>
  );
}
