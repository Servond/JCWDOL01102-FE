import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import { useRef } from "react";

function App() {
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
      h={"100dvh"}
      bg={"thirdColor"}
      shadow={"xl"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box fontSize={"4rem"} bg={"primaryColor"} h={"100dvh"}>
        <Text mx={2} bg={"white"}>
          Hello
        </Text>
      </Box>
      <Box fontSize={"4rem"} bg={"primaryColor"} h={"100dvh"}>
        Hello World
      </Box>
      <Box fontSize={"4rem"} bg={"primaryColor"} h={"100dvh"}>
        Hello World
      </Box>
    </Box>
  );
}

export default App;
