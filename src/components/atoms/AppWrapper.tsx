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
import { setCurrentPageIndex } from "../../app/redux/slice/Navbar/Navbar";

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

  const scrollHandle = (ev: globalThis.WheelEvent) => {
    boxRef.current?.scrollTo({
      top: (boxRef.current.scrollTop += ev.deltaY),
    });
    return;
  };

  const widthhandler = (isDashboard: boolean) => {
    if (!isDashboard) {
      return isMobile ? "full" : "500px";
    } else {
      return "full";
    }
  };

  const isShowNavbar = (path: string) => {
    const whitelist = ["/", "/menu", "/cart", "/notification", "/explore"];
    return whitelist.some((whitelist) => whitelist === path);
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
  }, []);

  useEffect(() => {
    const determineNavbarIndex = (path: string) => {
      const whitelist = ["/", "/explore", "/cart", "/notification", "/menu"];
      const index = whitelist.indexOf(path);
      if (index === -1) {
        return;
      }
      dispatch(setCurrentPageIndex(index));
    };
    determineNavbarIndex(location.pathname);
    boxRef.current?.scrollTo(0, 0);
    if (location.pathname.startsWith("/dashboard")) {
      setDashboard(true);
    }

    if (isDashboard && !location.pathname.startsWith("/dashboard")) {
      setDashboard(false);
    }
  }, [location]);

  return (
    <Box
      maxW={widthhandler(isDashboard)}
      m={"auto"}
      h={"100dvh"}
      bg={"#F4F4F4"}
      shadow={"xl"}
      display={"flex"}
      flexDir={"column"}
      onMouseLeave={() => {
        window.addEventListener("wheel", scrollHandle, true);
      }}
      onMouseEnter={() =>
        window.removeEventListener("wheel", scrollHandle, true)
      }
    >
      {isRender ? (
        <Box
          ref={boxRef}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
          px={"1rem"}
          maxHeight={
            isDashboard || location.pathname.includes("/product-details")
              ? "full"
              : "calc(100vh - 60px)"
          }
          overflowY="auto"
        >
          <Outlet />
        </Box>
      ) : null}
      {isShowNavbar(location.pathname) ? <DummyNavBar /> : null}
    </Box>
  );
}
