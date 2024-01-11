import { Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../app/redux/store";
import DashboardContent from "../../components/organism/Dashboard/DashboardContent";
import DashboardNavBar from "../../components/organism/Dashboard/DashboardNavBar";
import { Role } from "../../data/constants";
import { setDiscountTabsCurrent } from "../../app/redux/slice/Admin/discount/discountTabs";

export default function DashboardPage() {
  const userRole = useSelector((state: RootState) => state.login.role);
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState<string>("");
  const prevPath = useRef<string>("");
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (prevPath.current.includes("/dashboard")) return;
    if (userRole === Role.SUPER_ADMIN) {
      navigate("/dashboard/user-management");
    } else if (userRole === Role.BRANCH_ADMIN) {
      navigate("/dashboard/products");
    } else {
      navigate("/login");
    }
  }, [navigate, userRole, path]);

  useEffect(() => {
    prevPath.current = path;
    setPath(location.pathname);
    if (location.pathname === "/dashboard/discount-management") {
      dispatch(setDiscountTabsCurrent(0));
    }
  }, [location.pathname]);
  return (
    <Flex w={"full"} py={"1rem"} h={"100dvh"}>
      <DashboardNavBar />
      <DashboardContent />
    </Flex>
  );
}
