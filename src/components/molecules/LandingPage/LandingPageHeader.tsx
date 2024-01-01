import { VStack } from "@chakra-ui/react";

import Welcoming from "./Welcoming";
import Banner from "../../atoms/LandingPage/Banner";
import NearestBranch from "./NearestStore";

export default function LandingPageHeader() {
  return (
    <VStack w={"full"} align={"start"} mt={"1rem"} spacing={"1rem"}>
      <Welcoming />
      <Banner />
      <NearestBranch />
    </VStack>
  );
}
