import { Avatar, Box, Text, VStack } from "@chakra-ui/react";

export default function UploadPhoto() {
  return (
    <Box minW={"200px"} w={"30%"} h={"full"} p={"1rem"}>
      <Box
        border={"dashed 3px"}
        borderRadius={"10px"}
        h={"50%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        borderColor={"primaryColor"}
      >
        <VStack spacing={"0.3rem"} p={"1rem"}>
          <Avatar w={"100px"} h={"100px"} mb={"1rem"} />
          <Text color={"primaryColor"} fontWeight={"bold"} textAlign={"center"}>
            Upload Profile Picture
          </Text>
          <Text color={"secondaryColor"}>maximum 2 MB</Text>
        </VStack>
      </Box>
    </Box>
  );
}
