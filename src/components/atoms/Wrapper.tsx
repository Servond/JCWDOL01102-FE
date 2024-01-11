import { Box } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";
import { useRef } from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const boxRef = useRef<HTMLDivElement>(null);

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
      h={"100vh"}
      bg={"thirdColor"}
      shadow={"xl"}
      overflowY={"auto"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
      px={"1.5rem"}
    >
      {children}
    </Box>
  );
}
