import { Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../app/redux/store";
import DashboardContent from "../../components/organism/Dashboard/DashboardContent";
import DashboardNavBar from "../../components/organism/Dashboard/DashboardNavBar";
import { Role } from "../../data/constants";

export default function DashboardPage() {
  const userRole = useSelector((state: RootState) => state.login.role);
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState<string>("");
  const prevPath = useRef<string>("");
  useEffect(() => {
    if (prevPath.current.includes("/dashboard")) return;
    if (userRole === Role.SUPER_ADMIN) {
      navigate("/dashboard/user-management");
    } else if (userRole === Role.BRANCH_ADMIN) {
      navigate("/dashboard/products");
    } else {
      navigate("/*");
    }
  }, [navigate, userRole, path]);

  useEffect(() => {
    prevPath.current = path;
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <Flex w={"full"} py={"1rem"} h={"100dvh"}>
      <DashboardNavBar />
      <DashboardContent />
    </Flex>
  );
}
