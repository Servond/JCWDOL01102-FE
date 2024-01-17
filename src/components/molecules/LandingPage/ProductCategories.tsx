import {
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect, useRef, useState } from "react";
import { fetchLandingpageCategories } from "../../../app/redux/slice/LandingPage/getLandingpageCategories";
import CarouselButton from "../../atoms/LandingPage/CarouselButton";
import { AnimatePresence } from "framer-motion";
import { setLandingpageProductFilterBy } from "../../../app/redux/slice/Explore/productPagination";
import { useNavigate } from "react-router-dom";
import { setCurrentCategoryIndex } from "../../../app/redux/slice/LandingPage/categories";

export default function ProductCategories() {
  const dispatch = useDispatch<AppDispatch>();
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  useEffect(() => {
    dispatch(fetchLandingpageCategories(branchId));
  }, []);
  const onNext = () => {
    const grid = gridRef.current;
    grid?.scrollTo({
      left: grid.scrollWidth,
      behavior: "smooth",
    });
  };
  const onPrev = () => {
    const grid = gridRef.current;
    grid?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const { categories, apiState } = useSelector(
    (state: RootState) => state.landingPageCategories
  );
  const gridRef = useRef<HTMLDivElement>(null);
  const [isFocused, setFocus] = useState<boolean>(false);
  const navigate = useNavigate();
  const onFocus = () => setFocus(true);
  const onBlur = () => setFocus(false);
  const onClick = (filter: string, id: number) => {
    return () => {
      dispatch(setCurrentCategoryIndex(id));
      dispatch(setLandingpageProductFilterBy(filter));
      navigate("/explore");
    };
  };
  return (
    <VStack
      spacing={"1rem"}
      w={"full"}
      align={"start"}
      position={"relative"}
      onMouseEnter={onFocus}
      onMouseLeave={onBlur}
    >
      <Heading size={"md"}>Categories</Heading>
      <Skeleton
        isLoaded={apiState === "done" && categories.length > 0}
        minH={"50px"}
        borderRadius={"10px"}
        w={"full"}
      >
        <Card
          w={"full"}
          maxWidth={`calc(${isMobile ? window.screen.width : "500"}px - 2rem)`}
          borderRadius={"10px"}
        >
          <AnimatePresence>
            {isFocused && categories.length > 0 && (
              <>
                <CarouselButton
                  key={"next"}
                  variant="next"
                  onClick={onNext}
                  gridHeight={gridRef.current?.offsetHeight}
                  isFocused={isFocused}
                />
                <CarouselButton
                  key={"previous"}
                  variant="previous"
                  onClick={onPrev}
                  gridHeight={gridRef.current?.offsetHeight}
                  isFocused={isFocused}
                />
              </>
            )}
          </AnimatePresence>

          <CardBody px={0}>
            <Grid
              gridTemplateColumns={"repeat(5, 1fr)"}
              gap={"1rem"}
              overflowX={"auto"}
              overflowY={"hidden"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "thin", // For Firefox
              }}
              px={"1rem"}
              ref={gridRef}
            >
              {categories.map((category, index) => (
                <GridItem key={index}>
                  <Button
                    w={"150px"}
                    variant={"secondaryButton"}
                    borderRadius={"full"}
                    fontSize={"14px"}
                    noOfLines={1}
                    whiteSpace={"normal"}
                    onClick={onClick(category.name, category.id)}
                  >
                    {category.name}
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </CardBody>
        </Card>
      </Skeleton>
    </VStack>
  );
}
