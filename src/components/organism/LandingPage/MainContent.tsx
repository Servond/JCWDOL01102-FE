import { VStack } from "@chakra-ui/react";
import LandingpageSearchbar from "../../atoms/LandingPage/LandingpageSearchbar";
import ProductRecomendation from "../../molecules/LandingPage/ProductRecomendation";
import { useNavigate } from "react-router-dom";

export default function MainContent() {
  const navigate = useNavigate();
  return (
    <VStack w={"full"} spacing={"1rem"} mt={"1rem"}>
      <VStack
        w={"500px"}
        position={"sticky"}
        top={"0px"}
        zIndex={"2"}
        bg={"white"}
        p={"1rem"}
        shadow={"sm"}
      >
        <LandingpageSearchbar
          placeHolder="Search store..."
          onChange={() => {}}
          onClick={() => navigate("/explore")}
        />
      </VStack>
      <ProductRecomendation />
    </VStack>
  );
}
