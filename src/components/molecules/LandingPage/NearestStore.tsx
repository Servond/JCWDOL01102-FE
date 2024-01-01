import {
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import storeSvg from "../../../assets/store.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
export default function NearestBranch() {
  const branch = useSelector((state: RootState) => state.nearestBranch.branch);
  return (
    <Card w={"full"} borderRadius={"10px"}>
      <CardBody py={"8px"} px={"1rem"}>
        <HStack h={"full"} w={"full"} justify={"start"} spacing={"1rem"}>
          <Box w={"70px"} h={"100px"}>
            <Image h={"100%"} w={"100%"} src={storeSvg} />
          </Box>
          <VStack h={"full"} align={"start"} spacing={"8px"}>
            <Heading fontSize={"18px"}>Nearest Branch</Heading>
            <Heading fontSize={"20px"} color={"primaryColor"}>
              {branch.name}
            </Heading>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
}
