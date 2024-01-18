import { VStack, useMediaQuery } from "@chakra-ui/react";
import LandingpageSearchbar from "../../atoms/LandingPage/LandingpageSearchbar";
import ProductRecomendation from "../../molecules/LandingPage/ProductRecomendation";
import { useNavigate } from "react-router-dom";
import ProductCategories from "../../molecules/LandingPage/ProductCategories";

export default function MainContent() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const navigate = useNavigate();
  return (
    <VStack w={"full"} spacing={"1rem"} mt={"1rem"}>
      <VStack
        w={isMobile ? `${window.screen.width}px` : "500px"}
        position={"sticky"}
        top={"0px"}
        zIndex={"2"}
        bg={"white"}
        p={"1rem"}
        shadow={"sm"}
      >
        <LandingpageSearchbar
          placeHolder="Search store..."
          onClick={() => navigate("/explore", { state: { focus: true } })}
        />
      </VStack>
      <ProductCategories />
      <ProductRecomendation />
    </VStack>
  );
}
