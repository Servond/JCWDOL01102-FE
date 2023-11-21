import {
  Divider,
  VStack,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Address } from "../../app/redux/slice/AddressList/addressListSlice";
import { RootState } from "../../app/redux/store";
import TitleHeaderProfile from "../../components/molecules/MyDetails/TitleHeaderProfile";
import AddressDetail from "../../components/organism/AddressDetails/AddressDetail";

export default function UpdateAddressPage() {
  const zoom = keyframes`
    from {transform: scale(0.95);}
    to {transform: scale(1);}`;
  const motion = usePrefersReducedMotion();
  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;
  const navigate = useNavigate();
  const params = useParams();
  const addressListState = useSelector((state: RootState) => state.addressList);

  const getData = () => {
    const { id } = params as { id: string };
    const address = addressListState.addressList.find(
      (item) => parseInt(id) === item.id
    );
    if (!address) {
      navigate("/my-address");
    }
  };
  getData();
  const address = useMemo<Address | undefined>(
    () =>
      addressListState.addressList.find(
        (item) => item.id === parseInt(params.id!)
      ),
    [addressListState.addressList, params.id]
  );

  const handleBack = () => {
    navigate("/my-address");
  };
  return (
    <VStack animation={animation}>
      <TitleHeaderProfile title='Detail Alamat' callback={handleBack} />
      <Divider />
      <AddressDetail
        isUpdate={true}
        addressLabel={address?.addressName}
        receiverName={address?.name}
        phoneNumber={address?.phoneNumber}
        address={address?.address}
        city={" "}
        province={" "}
      />
    </VStack>
  );
}
