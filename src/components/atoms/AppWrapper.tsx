import { Box } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { useRef } from "react";
import { Outlet } from "react-router";
import DummyNavBar from "../organism/dummyNavBar";
import { useLocation } from "react-router-dom";

export default function AppWrapper() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const boxRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const scrollHandle = () => {
    boxRef.current?.scrollTo({
      top: window.scrollY,
    });
  };

  return (
    <Box
      onMouseLeave={() => window.addEventListener("scroll", scrollHandle, true)}
      onMouseEnter={() =>
        window.removeEventListener("scroll", scrollHandle, true)
      }
      maxW={isMobile ? "full" : "500px"}
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
      <Box px={"1.5rem"}>
        <Outlet />
      </Box>
    </Box>
  );
}
