import { Heading, VStack } from "@chakra-ui/layout";
import ProductCardSkeleleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";
import { useMediaQuery } from "@chakra-ui/media-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect } from "react";
import { fetchProductRecommendation } from "../../../app/redux/slice/LandingPage/productRecommendation";
import Masonry from "react-responsive-masonry";

export default function ProductRecomendation() {
  // const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isSmallMobile] = useMediaQuery("(max-width: 320px)");
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(
    (state: RootState) => state.productRecommendation.products
  );
  const apiState = useSelector(
    (state: RootState) => state.productRecommendation.apiState
  );
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  // const calculateGridWidth = (isMobile: boolean) => {
  //   if (isSmallMobile) {
  //     return `repeat(1, calc((${window.screen.width}px - 3rem)/2)))`;
  //   }
  //   if (!isMobile) {
  //     return "repeat(2, calc((500px - 3rem)/2))";
  //   } else {
  //     return `repeat(2, calc((${window.screen.width}px - 3rem)/2))`;
  //   }
  // };

  useEffect(() => {
    dispatch(fetchProductRecommendation(branchId));
  }, [dispatch]);

  return (
    <VStack w={"full"} align={"start"} pb={"1rem"} mt={"1rem"}>
      <Heading fontSize={"20px"} mb={"1rem"} fontWeight={"bold"}>
        Recommendation
      </Heading>
      {/* <Grid gridTemplateColumns={calculateGridWidth(isMobile)} gap={"1rem"}>
        {apiState !== "done"
          ? [...new Array(10)].map((_, index) => (
              <GridItem key={index} w={"full"}>
                <ProductCardSkeleleton />
              </GridItem>
            ))
          : products.map((product, index) => (
              <GridItem key={index} w={"full"}>
                <ProductCard product={product} key={index} />
              </GridItem>
            ))}
      </Grid> */}

      <Masonry columnsCount={isSmallMobile ? 1 : 2} gutter="0.6rem">
        {apiState !== "done"
          ? [...new Array(10)].map((_, index) => (
              // <GridItem key={index} w={"full"}>
              <ProductCardSkeleleton key={index} />
              // </GridItem>
            ))
          : products.map((product, index) => (
              // <GridItem key={index} w={"full"}>
              <ProductCard product={product} key={index} />
              // </GridItem>
            ))}
      </Masonry>
    </VStack>
  );
}
