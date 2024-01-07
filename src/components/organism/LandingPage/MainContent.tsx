import { VStack } from "@chakra-ui/react";
import LandingpageSearchbar from "../../atoms/LandingPage/LandingpageSearchbar";
import Categories from "../../molecules/LandingPage/Categories";
import ProductList from "../../molecules/LandingPage/ProductList";
import ProductSortBy from "../../atoms/LandingPage/ProductSortBy";
import ProductRecomendation from "../../molecules/LandingPage/ProductRecomendation";
import ProductCategories from "../../molecules/LandingPage/ProductCategories";

export default function MainContent() {
  return (
    <VStack w={"full"} spacing={"1rem"} mt={"2rem"}>
      {/* <VStack
        w={"full"}
        spacing={"1rem"}
        position={"sticky"}
        top={"4px"}
        zIndex={"2"}
      >
        <LandingpageSearchbar
          placeHolder="Search store..."
          onChange={() => {}}
        />
        <Categories />
      </VStack>
      <ProductSortBy /> */}
      <ProductCategories />
      <ProductRecomendation />
    </VStack>
  );
}
