import {
  Divider,
  VStack,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import TitleHeaderProfile from "../../components/molecules/MyDetails/TitleHeaderProfile";
import AddressDetail from "../../components/organism/AddressDetails/AddressDetail";
import { useNavigate } from "react-router-dom";

export default function AddAddressPage() {
  const zoom = keyframes`
    from {transform: scale(0.95);}
    to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/my-address");
  };
  return (
    <VStack animation={animation}>
      <TitleHeaderProfile title='Detail Alamat' callback={handleBack} />
      <Divider />
      <AddressDetail />
    </VStack>
  );
}
