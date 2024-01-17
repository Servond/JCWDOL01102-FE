import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Grid,
  GridItem,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import CategoryMore from "./CategoryMore";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { fetchLandingpageCategories } from "../../../app/redux/slice/LandingPage/getLandingpageCategories";
interface IFinishOrderAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategoriesModal(props: IFinishOrderAlertProps) {
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const dispatch = useDispatch<AppDispatch>();
  const calculateWidth = (isMobile: boolean) => {
    if (!isMobile) {
      return "calc(500px - 5%)";
    } else {
      return `calc(${window.screen.width}px - 10%)`;
    }
  };

  const categories = useSelector(
    (state: RootState) => state.landingPageCategories.categories
  );

  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );

  useEffect(() => {
    dispatch(
      fetchLandingpageCategories(
        branchId
          ? Number(branchId)
          : Number(JSON.parse(localStorage.getItem("branch")).id)
      )
    );
  }, []);
  return (
    <AlertDialog
      isOpen={props.isOpen}
      onClose={props.onClose}
      leastDestructiveRef={cancelRef}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        p={"1rem"}
        w={calculateWidth(isMobile)}
        borderRadius={"18px"}
      >
        <AlertDialogCloseButton />
        <AlertDialogHeader mb={"8px"}>
          <Heading fontSize={"2rem"} w={"full"} textAlign={"center"}>
            Categories
          </Heading>
        </AlertDialogHeader>
        <AlertDialogBody p={0}>
          <Grid
            gridTemplateColumns={"repeat(2, 1fr)"}
            overflowY={"auto"}
            minH={"400px"}
            maxH={"500px"}
            gap={"1rem"}
            px={"12px"}
          >
            {categories.map((category, index) => (
              <GridItem>
                <CategoryMore
                  categoryId={category.id}
                  categoryName={category.name}
                  key={index}
                  onClose={props.onClose}
                />
              </GridItem>
            ))}
          </Grid>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  );
}
