import {
  Divider,
  VStack,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AddressButton from "../../components/molecules/AddressList/AddressButton";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";
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
    navigate("/add-address");
  };

  return (
    <>
      <VStack pb={"15px"} animation={animation} height={"100vh"}>
        <TitleHeader
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
