import { Box, Text } from "@chakra-ui/react";
import Loading from "../atoms/Loading";

export default function LoadingCenter() {
  return (
    <Box
      width={"100%"}
      padding={"1rem"}
      justifyContent={"center"}
      alignItems={"center"}
      display={"flex"}
      flexDir={"column"}
    >
      <Loading />
      <Text mt={"1rem"}>Loading...</Text>
    </Box>
  );
}
