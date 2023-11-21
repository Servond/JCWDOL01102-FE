import { Box, Divider, Text, VStack } from "@chakra-ui/react";
import TitleHeaderProfile from "./TitleHeaderProfile";
import { useNavigate } from "react-router-dom";

export default function HeaderDetailProfile() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/menu");
  };

  return (
    <VStack>
      <TitleHeaderProfile title={"Ubah Profil"} callback={handleBack} />
      <Divider />
      <Box w={"100%"}>
        <Box
          mt={"10px"}
          mx={"auto"}
          width={"100%"}
          border={"2px solid #ccc"}
          borderRadius={"50%"}
          cursor={"pointer"}
          height={"120px"}
          w={"120px"}
        >
          <img
            src={
              "http://203.175.11.82:9001/api/v1/buckets/grocery/objects/download?preview=true&prefix=cHJvZmlsZS9Beml6aS1aZWUtMTc3NDQ0ODQ3MS53ZWJw&version_id=null"
            }
            style={{
              borderRadius: "50%",
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            alt={"ava"}
          />
        </Box>
        <Text
          textAlign={"center"}
          mt={"10px"}
          fontWeight={"bold"}
          fontSize={"larger"}
          cursor={"pointer"}
          color={"primaryColor"}
        >
          Ubah Foto Profil
        </Text>
      </Box>
      <Divider />
    </VStack>
  );
}
