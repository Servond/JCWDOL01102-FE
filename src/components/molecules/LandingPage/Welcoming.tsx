import {
  Avatar,
  Button,
  Flex,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

export default function Welcoming() {
  const userName = useSelector((state: RootState) => state.login.user?.name);
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  return isAuthenticated && userName ? (
    <HStack w={"full"} justify={"space-between"}>
      (
      <>
        <VStack w={"full"} justify={"center"} align={"start"} spacing={"4px"}>
          <Heading noOfLines={1} fontSize={"20px"} fontWeight={"bold"}>
            Hello,
            <Text as={"span"} color={"primaryColor"}>
              {userName}
            </Text>
          </Heading>
          <Text color={"forthColor"} fontSize={"12px"}>
            What are you looking for?
          </Text>
        </VStack>
        <Avatar w={"32px"} h={"32px"} />
      </>
      )
    </HStack>
  ) : (
    <Flex
      w={"full"}
      flexDir={"column"}
      justify={"center"}
      // align={"center"}
      bg={"white"}
      p={"1rem"}
      borderRadius={"10px"}
      // shadow={"md"}
    >
      <Heading fontSize={"32px"} mt={"0.2rem"}>
        Buy Fresh
        <Heading fontSize={"32px"} as={"span"} color={"primaryColor"} p={0}>
          {" Groceries "}
        </Heading>
        Easily With Us
      </Heading>
      <Button mt={"1rem"}>Explore now</Button>
    </Flex>
  );
}
