import { VStack } from "@chakra-ui/react";
import LandingpageSearchbar from "../../atoms/LandingPage/LandingpageSearchbar";
import Categories from "../../molecules/LandingPage/Categories";

export default function MainContent() {
  return (
    <VStack w={"full"} spacing={"1rem"}>
      <LandingpageSearchbar placeHolder="Search store..." onChange={() => {}} />
      <Categories />
    </VStack>
  );
}
