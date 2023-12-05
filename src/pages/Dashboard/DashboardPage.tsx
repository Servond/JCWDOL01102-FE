import { Flex } from "@chakra-ui/react";
import DashboardNavBar from "../../components/organism/Dashboard/DashboardNavBar";
import DashboardContent from "../../components/organism/Dashboard/DashboardContent";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { Role } from "../../data/constants";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const userRole = useSelector((state: RootState) => state.login.role);
  const navigate = useNavigate();
  useEffect(() => {
    // if (userRole === Role.SUPER_ADMIN) {
    //   navigate("/dashboard/user-management");
    // } else if (userRole === Role.BRANCH_ADMIN) {
    //   navigate("/dashboard/products");
    // } else {
    //   navigate("/*");
    // }
  }, [navigate, userRole]);
  return (
    <Flex w={"full"} py={"1rem"} h={"100dvh"}>
      <DashboardNavBar />
      <DashboardContent />
    </Flex>
  );
}
