import { HStack, Skeleton, useDisclosure } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect } from "react";
import { fetchCategoriesWithLimit } from "../../../app/redux/slice/Explore/getCategoriesWithLimit";
import ProductCategoryItem from "../../atoms/LandingPage/ProductCategoryItem";
import MoreButton from "../../atoms/LandingPage/MoreButton";
import { IBranchWithDistanceAttributes } from "../../../data/branch/interface";
import CategoriesModal from "./CategoriesModal";

export default function Categories() {
  const currentCategories = useSelector(
    (state: RootState) => state.landingpageCategory.currentCategoryIndex
  );
  const categories = useSelector(
    (state: RootState) => state.getCategoriesWithLimit.categories
  );
  const apiState = useSelector(
    (state: RootState) => state.getCategoriesWithLimit.apiState
  );
  const branch = useSelector((state: RootState) => state.nearestBranch.branch);
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (Object.keys(branch).length === 0) {
      const branchTemp: IBranchWithDistanceAttributes = JSON.parse(
        localStorage.getItem("branch")!
      );
      dispatch(fetchCategoriesWithLimit({ limit: 4, branchId: branchTemp.id }));
    } else {
      dispatch(fetchCategoriesWithLimit({ limit: 4, branchId: branch.id }));
    }
  }, []);

  return (
    <HStack
      overflowX={"scroll"}
      overflowY={"hidden"}
      key={"hello"}
      w={"full"}
      justify={"space-between"}
      // spacing={"rem"}
      align={"center"}
      h={"30px"}
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "thin", // For Firefox
      }}
    >
      {apiState === "done"
        ? categories.map((category, index) => {
            if (index === 5) {
              return (
                <>
                  <MoreButton key={index} onClick={onOpen} />
                  <CategoriesModal isOpen={isOpen} onClose={onClose} />
                </>
              );
            }
            return (
              <ProductCategoryItem
                currentCategoryIndex={currentCategories}
                id={category.id}
                name={category.name}
                key={index}
              />
            );
          })
        : [...new Array(5)].map((_, index) => {
            return <Skeleton w={"60px"} h={"10px"} key={index} />;
          })}
    </HStack>
  );
}
