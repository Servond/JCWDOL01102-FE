import { Box, VStack, useMediaQuery } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { setRender } from "../../../app/redux/slice/Animation/animationSlice";
import MenuItem from "./MenuItem";
import {
  MdOutlineSettings,
  MdOutlinePersonAddAlt1,
  MdLogin,
  MdOutlineDashboard,
} from "react-icons/md";
import { Role } from "../../../data/constants";

const drawerAnimations = {
  open: {
    opacity: 1,
    height: ["calc(50dvh - 50px)", "calc(100dvh - 50px)"],
    transition: {
      type: "tween",
      stiffness: 100,
      duration: 0.5,
      staggerChildren: 2,
    },
  },
  close: {
    opacity: 0,
    height: ["calc(50dvh - 50px)", "0"],
    transition: {
      type: "tween",
      stiffness: 100,
      duration: 0.5,
      when: "afterChildren",
    },
  },
};

const textAnimations = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      stiffness: 100,
      duration: 0.3,
    },
  },
  close: {
    x: "-300px",
    opacity: 0,
    transition: {
      type: "tween",
      stiffness: 100,
      duration: 0.3,
    },
  },
};

export default function DrawerMenu() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const isDrawerOpen = useSelector(
    (state: RootState) => state.animation.drawer
  );
  const isRender = useSelector((state: RootState) => state.animation.isRender);
  const dispatch = useDispatch<AppDispatch>();
  const userRole = useSelector((state: RootState) => state.login.role);
  return isRender ? (
    <Box
      as={motion.div}
      backgroundColor={"primaryColor"}
      initial={{ opacity: 0, height: 0 }}
      animate={isDrawerOpen ? "open" : "close"}
      position={"fixed"}
      w={isMobile ? "full" : "500px"}
      variants={drawerAnimations}
      onAnimationComplete={() => {
        if (!isDrawerOpen) {
          dispatch(setRender(false));
        }
      }}
    >
      <VStack
        p={"1rem"}
        as={motion.div}
        initial={{ x: "-300px" }}
        animate={isDrawerOpen ? "open" : "close"}
        w={"full"}
        spacing={"2rem"}
        color={"white"}
        variants={textAnimations}
        align={"left"}
      >
        <MenuItem value="Profile" icon={<MdOutlineSettings />} to={"/menu"} />
        <MenuItem
          value="Sign Up"
          icon={<MdOutlinePersonAddAlt1 />}
          to={"/signup"}
        />
        <MenuItem value="Log In" icon={<MdLogin />} to={"/login"} />
        {userRole === Role.BRANCH_ADMIN || userRole === Role.SUPER_ADMIN ? (
          <MenuItem
            value="Dashboard"
            icon={<MdOutlineDashboard />}
            to={"/dashboard"}
          />
        ) : null}
      </VStack>
    </Box>
  ) : null;
}
