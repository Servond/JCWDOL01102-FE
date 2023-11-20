import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";

export default function ProfileHeader() {
  return (
    <Box height={"65px"} my={"35px"}>
      <HStack>
        <Box marginLeft={"25px"} height={"65px"} width={"65px"}>
          <img
            src='https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/04/03/Azizi-Zee-1774448471.jpeg'
            alt='profile'
            style={{
              borderRadius: "50%",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <VStack alignItems={"flex-start"} pl={"10px"}>
          <HStack>
            <Text
              fontSize={"20px"}
              fontWeight={"bold"}
              lineHeight={0}
              textAlign={"left"}
              my={1}
            >
              Azizi Asadel
            </Text>
            <FaRegEdit color={"#53B175"} />
          </HStack>
          <Text fontSize={"14px"} lineHeight={0} my={1}>
            azizi.asadel@gmail.com
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
