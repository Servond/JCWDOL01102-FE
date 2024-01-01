import { HStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect } from "react";
import { fetchCategoriesWithLimit } from "../../../app/redux/slice/LandingPage/getCategoriesWithLimit";
import ProductCategoryItem from "../../atoms/LandingPage/ProductCategoryItem";

export default function Categories() {
  const currentCategories = useSelector(
    (state: RootState) => state.landingpageCategory.currentCategoryIndex
  );
  const categories = useSelector(
    (state: RootState) => state.getCategoriesWithLimit.categories
  );
  const branch = useSelector((state: RootState) => state.nearestBranch.branch);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategoriesWithLimit({ limit: 10, branchId: branch.id }));
  }, []);

  return (
    <HStack
      overflowX={"scroll"}
      w={"calc(425px - 32px)"}
      justify={"space-between"}
      spacing={"1rem"}
      align={"center"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "thin", // For Firefox
      }}
    >
      {categories.map((category, index) => (
        <ProductCategoryItem
          currentCategoryIndex={currentCategories}
          id={category.id}
          name={category.name}
          key={index}
        />
      ))}
    </HStack>
  );
}
