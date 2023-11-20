import { Box, Divider, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { PiArrowLeft } from "react-icons/pi";
import { Link } from "react-router-dom";
import SubProfileInfo from "../../components/organism/MyDetails/subProfileInfo";

export default function MyDetailsPage() {
  return (
    <Box
      height={"100vh"}
      // overflow={"scroll"}
      // overflowY={"hidden"}
      // overflowX={"hidden"}
    >
      <VStack>
        <HStack p={"10px"} width={"100%"}>
          <Link to={"/menu"}>
            <PiArrowLeft size={"24px"} cursor={"pointer"} />
          </Link>
          <Text fontWeight={"bold"}>Ubah Profil</Text>
          <Spacer />
        </HStack>
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
      <VStack p={"10px"}>
        {/* <HStack w={"100%"} mb={"5px"}>
          <Text fontWeight={"bold"}>Info Pribadi</Text>
          <Spacer />
        </HStack> */}
        <SubProfileInfo label={"Nama Lengkap"} value={"Azizi Asadel"} />
        <SubProfileInfo label={"Email"} value={"azizi.asadel@gmail.com"} />
        <SubProfileInfo label={"Nomor Handphone"} value={"08123456789"} />
        <SubProfileInfo label={"Jenis Kelamin"} value={"Laki-laki"} />
        <SubProfileInfo label={"Tanggal Lahir"} value={"10-10-1995"} />
        <SubProfileInfo
          label={"Refferal Code"}
          value={"123456"}
          copyIcon={true}
        />
      </VStack>
    </Box>
  );
}
