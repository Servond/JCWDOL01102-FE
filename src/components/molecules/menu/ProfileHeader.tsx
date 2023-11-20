import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";

export default function ProfileHeader() {
  return (
    <Box height={"69px"} my={"35px"}>
      <HStack>
        <Box
          marginLeft={"25px"}
          height={"69px"}
          width={"69px"}
          border={"2px solid #53B175"}
          borderRadius={"50%"}
        >
          <img
            src='http://203.175.11.82:9001/api/v1/buckets/grocery/objects/download?preview=true&prefix=cHJvZmlsZS9Beml6aS1aZWUtMTc3NDQ0ODQ3MS53ZWJw&version_id=null'
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
            <FaRegEdit color={"#53B175"} style={{ cursor: "pointer" }} />
          </HStack>
          <Text fontSize={"14px"} lineHeight={0} my={1}>
            azizi.asadel@gmail.com
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
}
