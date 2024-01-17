import {
  Divider,
  VStack,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Address } from "../../app/redux/slice/AddressList/addressListSlice";
import { RootState } from "../../app/redux/store";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";
import AddressDetail from "../../components/organism/AddressDetails/AddressDetail";

export default function UpdateAddressPage() {
  const zoom = keyframes`
    from {transform: scale(0.95);}
    to {transform: scale(1);}`;
  const motion = usePrefersReducedMotion();
  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const addressListState = useSelector((state: RootState) => state.addressList);
  // const [address, setAddress] = useState<Address | undefined>(undefined);

  const getData = () => {
    const address2 = addressListState.addressList.find(
      (item) => parseInt(params.id!) === item.id
    );
    if (!address2) {
      navigate("/my-address", { replace: true });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const address = useMemo<Address | undefined>(
    () =>
      addressListState.addressList.find(
        (item) => item.id === parseInt(params.id!)
      ),
    [addressListState.addressList, params.id]
  );

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const handleBack = () => {
    const backUrl = query.get("back") ? `/${query.get("back")}` : "/my-address";
    navigate(backUrl);
  };
  return (
    <VStack animation={animation}>
      <TitleHeader title='Detail Alamat' callback={handleBack} />
      <Divider />
      <AddressDetail
        updateId={parseInt(params.id!)}
        isUpdate={true}
        addressLabel={address?.name}
        receiverName={address?.receiverName}
        phoneNumber={address?.phoneNumber}
        address={address?.address}
        city={address?.cityId.toString()}
        province={address?.provinceId.toString()}
        latitude={address?.latitude}
        longitude={address?.longitude}
      />
    </VStack>
  );
}
