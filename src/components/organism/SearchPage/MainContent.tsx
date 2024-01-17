import { Heading, VStack } from "@chakra-ui/react";
import LandingpageSearchbar from "../../atoms/LandingPage/LandingpageSearchbar";
import Categories from "../../molecules/SearchPage/Categories";
import ProductSortBy from "../../atoms/LandingPage/ProductSortBy";
import ProductList from "../../molecules/LandingPage/ProductList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { setLandingpageProductNameSearch } from "../../../app/redux/slice/Explore/productPagination";

export default function MainContent() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <VStack py={"1rem"} align={"center"}>
      <Heading mb={"1rem"}>
        Let's{" "}
        <Heading as="span" color={"primaryColor"}>
          Explore
        </Heading>
      </Heading>
      <LandingpageSearchbar
        onChange={(e) => dispatch(setLandingpageProductNameSearch(e))}
      />
      <Categories />
      <ProductSortBy />
      <ProductList />
    </VStack>
  );
}
