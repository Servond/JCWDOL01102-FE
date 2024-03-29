import {
  Divider,
  VStack,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressButton from "../../components/molecules/AddressList/AddressButton";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";
import AddressList from "../../components/organism/AddressList/AddressList";

export default function AddressListPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const handleBack = () => {
    const backUrl = query.get("back") ? `/${query.get("back")}` : "/menu";
    navigate(backUrl);
  };
  const zoom = keyframes`
  from {transform: scale(0.95);}
  to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;

  const handleAddAddress = () => {
    const addAddressUrl = query.get("back")
      ? `/add-address?back=my-address?back=order`
      : "/add-address";
    navigate(addAddressUrl);
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
