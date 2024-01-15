import { VStack } from "@chakra-ui/layout";
import ProductCard from "./ProductCard";
import { useMediaQuery } from "@chakra-ui/media-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect, useRef, useState } from "react";
import { fetchLandingpageProduct } from "../../../app/redux/slice/Explore/productPagination";
import Paginate from "../Paginate";
import ProductCardSkeleleton from "./ProductCardSkeleton";
import Masonry from "react-responsive-masonry";
import { Skeleton } from "@chakra-ui/skeleton";
import ProductNotFound from "../../atoms/LandingPage/ProductNotFound";

export default function ProductList() {
  const [isSmallMobile] = useMediaQuery("(max-width: 320px)");
  const dispatch = useDispatch<AppDispatch>();
  const {
    products,
    filterBy,
    sortBy,
    currentPages,
    name,
    totalPages,
    apiState,
    order,
  } = useSelector((state: RootState) => state.landingpageProduct);
  const [selectedPage, setSelectedPage] = useState<number>(0);
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

  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );

  const categoryId = useSelector(
    (state: RootState) => state.landingpageCategory.currentCategoryIndex
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (selectedItem: any) => {
    setSelectedPage(selectedItem.selected);
  };
  const prevSelectedPage = useRef<number>(0);
  useEffect(() => {
    if (branchId) {
      dispatch(
        fetchLandingpageProduct({
          branchId: branchId,
          page:
            prevSelectedPage.current === selectedPage ? 1 : selectedPage + 1,
          categoryId: String(categoryId) === "0" ? "" : String(categoryId),
          filterBy,
          limit: 10,
          includePromotion: true,
          sortBy,
          name,
          order,
        })
      );
    } else {
      const branchId = JSON.parse(localStorage.getItem("branch")!).id;
      dispatch(
        fetchLandingpageProduct({
          branchId: branchId,
          page:
            prevSelectedPage.current === selectedPage ? 1 : selectedPage + 1,
          categoryId: String(categoryId) === "0" ? "" : String(categoryId),
          filterBy,
          limit: 10,
          includePromotion: true,
          sortBy,
          name,
          order,
        })
      );
    }
    prevSelectedPage.current = selectedPage;
  }, [
    selectedPage,
    categoryId,
    filterBy,
    sortBy,
    name,
    dispatch,
    branchId,
    order,
  ]);
  return (
    <VStack w={"full"}>
      {apiState === "done" && products.length === 0 ? (
        <ProductNotFound />
      ) : (
        // <Grid
        //   gridTemplateColumns={calculateGridWidth(isMobile)}
        //   gap={"1rem"}
        //   gridTemplateRows={"masonry"}
        // >
        //   {apiState !== "done"
        //     ? [...new Array(10)].map((_, index) => (
        //         <GridItem key={index} w={"full"}>
        //           <ProductCardSkeleleton />
        //         </GridItem>
        //       ))
        //     : products.map((product, index) => (
        //         <GridItem key={index} w={"full"}>
        //           <ProductCard product={product} key={index} />
        //         </GridItem>
        //       ))}
        // </Grid>

        <Masonry columnsCount={isSmallMobile ? 1 : 2} gutter="0.6rem">
          {apiState !== "done"
            ? [...new Array(10)].map((_, index) => (
                <ProductCardSkeleleton key={index} />
              ))
            : products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
        </Masonry>
      )}

      {apiState !== "done" ? (
        <Skeleton w={"200px"} h={"40px"} />
      ) : (
        <Paginate
          pageCount={totalPages}
          forcePage={currentPages - 1 < 0 ? 0 : currentPages - 1}
          onPageChange={handlePageChange}
        />
      )}
    </VStack>
  );
}
