import { Box } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import DummyNavBar from "../organism/dummyNavBar";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import {
  setAuthenticated,
  setPermission,
  setRole,
} from "../../app/redux/slice/User/login";
import { IUserFromToken } from "../../data/user/interfaces";
import { parseToken } from "../../utils/function/parseToken";

export default function AppWrapper() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const boxRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isDashboard, setDashboard] = useState<boolean>(true);
  const [isRender, setIsRender] = useState<boolean>(false);
  const userRole = useSelector((state: RootState) => state.login.role);
  const userPermission = useSelector(
    (state: RootState) => state.login.permission
  );
  const dispatch = useDispatch<AppDispatch>();

  const scrollHandle = () => {
    boxRef.current?.scrollTo({
      top: window.scrollY,
    });
  };

  const widthhandler = (isDashboard: boolean) => {
    if (!isDashboard) {
      return isMobile ? "full" : "500px";
    } else {
      return "full";
    }
  };

  useEffect(() => {
    if (userRole === "" || userPermission?.length === 0) {
      const userObj = parseToken(
        localStorage.getItem("token")
      ) as IUserFromToken;
      dispatch(setRole(userObj.role));
      dispatch(setPermission(userObj.permission));
      dispatch(setAuthenticated(true));
      setIsRender(true);
    } else {
      setIsRender(true);
    }

    if (location.pathname.startsWith("/dashboard")) {
      setDashboard(true);
    }

    if (isDashboard && !location.pathname.startsWith("/dashboard")) {
      setDashboard(false);
    }
  }, [location]);

  return (
    <Box
      onMouseLeave={() => window.addEventListener("scroll", scrollHandle, true)}
      onMouseEnter={() =>
        window.removeEventListener("scroll", scrollHandle, true)
      }
      maxW={widthhandler(isDashboard)}
      ref={boxRef}
      m={"auto"}
      h={"100dvh"}
      bg={"thirdColor"}
      shadow={"xl"}
      overflowY={"auto"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {location.pathname === "/" ? <DummyNavBar /> : null}
      {isRender ? (
        <Box px={"1.5rem"}>
          <Outlet />
        </Box>
      ) : null}
    </Box>
  );
}
