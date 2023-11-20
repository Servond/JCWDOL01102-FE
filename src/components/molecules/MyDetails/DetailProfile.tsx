import { VStack } from "@chakra-ui/react";
import SubProfileInfo from "../../organism/MyDetails/subProfileInfo";

export default function DetailProfile() {
  return (
    <VStack p={"10px"}>
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
  );
}
