import { Box, Divider, Input, Text, VStack } from "@chakra-ui/react";
import TitleHeader from "./TitleHeader";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function HeaderDetailProfile() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const handleBack = () => {
    navigate("/menu");
  };

  return (
    <VStack>
      <TitleHeader title={"Ubah Profil"} callback={handleBack} />
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
            src={"default.jpg"}
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
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          Ubah Foto Profil
        </Text>
        <Input
          type={"file"}
          display={"none"}
          ref={fileRef}
          //image only
          accept={".jpg,.png,.jpeg,.gif,.svg,.webp"}
        />
      </Box>
      <Divider />
    </VStack>
  );
}
