import {
  Avatar,
  Button,
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
  return (
    <HStack w={"full"} justify={"space-between"}>
      {isAuthenticated && userName ? (
        <>
          <VStack w={"full"} justify={"center"} align={"start"} spacing={"4px"}>
            <Heading noOfLines={1} fontSize={"20px"} fontWeight={"bold"}>
              Hello, <Text as={"span"} color={"primaryColor"}>{userName}</Text>
            </Heading>
            <Text color={"forthColor"} fontSize={"12px"}>
              What are you looking for?
            </Text>
          </VStack>
          <Avatar w={"32px"} h={"32px"} />
        </>
      ) : (
        <>
          <Heading fontSize={"40px"}>
            Buy
            <Heading as={"span"} color={"primaryColor"}>
              {" Groceries"}
            </Heading>
            <br />
            Easily With Us
          </Heading>
          <Button>Explore now</Button>
        </>
      )}
    </HStack>
  );
}
