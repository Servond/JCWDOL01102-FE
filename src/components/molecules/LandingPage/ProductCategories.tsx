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
import { useEffect, useRef } from "react";
import { fetchLandingpageCategories } from "../../../app/redux/slice/LandingPage/getLandingpageCategories";
import CarouselButton from "../../atoms/LandingPage/CarouselButton";

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
  return (
    <VStack spacing={"1rem"} w={"full"} align={"start"}>
      <Heading size={"md"}>Categories</Heading>
      <Skeleton
        isLoaded={apiState === "done" && categories.length > 0}
        minH={"100px"}
        borderRadius={"10px"}
      >
        <Card
          w={"full"}
          maxWidth={`calc(${isMobile ? window.screen.width : "500"}px - 2rem)`}
          borderRadius={"10px"}
        >
          <CarouselButton variant="next" onClick={onNext} />
          <CarouselButton variant="previous" onClick={onPrev} />
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
                    variant={"secondaryButton"}
                    borderRadius={"full"}
                    fontSize={"16px"}
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
