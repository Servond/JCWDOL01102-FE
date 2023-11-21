import {
  Divider,
  VStack,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AddressButton from "../../components/molecules/AddressList/AddressButton";
import TitleHeaderProfile from "../../components/molecules/MyDetails/TitleHeaderProfile";
import AddressList from "../../components/organism/AddressList/AddressList";

export default function AddressListPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/menu");
  };
  const zoom = keyframes`
  from {transform: scale(0.95);}
  to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;

  const handleAddAddress = () => {
    alert("Add Address Clicked");
  };

  return (
    <>
      <VStack py={"15px"} animation={animation} height={"100vh"}>
        <TitleHeaderProfile
          title={"Daftar Alamat"}
          callback={handleBack}
          subMenu='Tambah Alamat'
          callbackSubmenu={handleAddAddress}
        />
        <Divider />
        <AddressList />
      </VStack>
      <AddressButton />
    </>
  );
}
