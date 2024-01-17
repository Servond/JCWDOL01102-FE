import { Box, Flex, Heading } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { setLandingpageProductFilterBy } from "../../../app/redux/slice/Explore/productPagination";
import { setCurrentCategoryIndex } from "../../../app/redux/slice/LandingPage/categories";

interface ICategoryMoreProps {
  categoryName: string;
  categoryId: number;
  onClose: () => void;
}

export default function CategoryMore(props: ICategoryMoreProps) {
  const dispatch = useDispatch<AppDispatch>();
  const limitedCategories = useSelector(
    (state: RootState) => state.getCategoriesWithLimit.categories
  );
  const onSelect = () => {
    dispatch(setLandingpageProductFilterBy(props.categoryName));

    const index = limitedCategories.findIndex(
      (category) => category.id === props.categoryId
    );

    if (index) {
      dispatch(setCurrentCategoryIndex(props.categoryId));
    }
    props.onClose();
  };
  return (
    <Box
      w={"full"}
      h={"120px"}
      borderRadius={"18px"}
      border={"1px solid"}
      borderColor={"secondaryColor"}
      color={"primaryColor"}
      px={"1rem"}
      _hover={{ cursor: "pointer" }}
      onClick={onSelect}
    >
      <Flex w={"full"} justify={"center"} align={"center"} h={"full"}>
        <Heading fontSize={"18px"} textAlign={"center"} noOfLines={2}>
          {props.categoryName}
        </Heading>
      </Flex>
    </Box>
  );
}
