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
  setToken,
  setUser,
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
  const userIsAuth = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.login.user);
  const token = useSelector((state: RootState) => state.login.token);
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
    if (
      !user ||
      !userRole ||
      userPermission?.length === 0 ||
      !userIsAuth ||
      !token
    )
      return;
    setIsRender(true);
  }, [user, userRole, userPermission, userIsAuth, token]);

  useEffect(() => {
    const userObj = parseToken(localStorage.getItem("token")) as IUserFromToken;
    if (userObj) {
      dispatch(setRole(userObj.role));
      dispatch(setToken(localStorage.getItem("token")));
      dispatch(setPermission(userObj.permission));
      dispatch(setAuthenticated(true));
      dispatch(setUser(userObj));
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
