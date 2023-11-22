import { VStack } from "@chakra-ui/react";
import SubProfileInfo from "../../molecules/MyDetails/SubProfileInfo";

export default function DetailProfile() {
  return (
    <VStack>
      <SubProfileInfo
        label={"Nama Lengkap"}
        value={"Azizi Asadel"}
        field='name'
      />
      <SubProfileInfo
        label={"Email"}
        value={"azizi.asadel@gmail.com"}
        field='email'
      />
      <SubProfileInfo
        label={"Nomor Handphone"}
        value={"08123456789"}
        field='phoneNumber'
      />
      <SubProfileInfo
        label={"Tanggal Lahir"}
        value={"2004-05-04"}
        field='birthdate'
      />
      <SubProfileInfo
        field='refferalCode'
        label={"Refferal Code"}
        value={"123456"}
        copyIcon={true}
      />
    </VStack>
  );
}
