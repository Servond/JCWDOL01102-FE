import {
  Card,
  CardBody,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import AddressLabel from "../../atoms/MyAddress/AddressLabel";
import AddressName from "../../atoms/MyAddress/AddressName";
import ChangeAddressBtn from "../../atoms/MyAddress/ChangeAddressButton";
import AddressTag from "../../atoms/MyAddress/addressTag";
import { selectAddress } from "../../../app/redux/slice/AddressList/addressListSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";

interface Props {
  addressName: string;
  name: string;
  phoneNumber: string;
  address: string;
  isDefault: boolean;
  isSelected: boolean;
  id: number;
  isDisabled?: boolean;
}

export default function AddressCard(props: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleClick = () => {
    dispatch(selectAddress(props.id));
  };
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const handleUpdate = () => {
    const updateAddressUrl = query.get("back")
      ? `/update-address/${props.id}?back=my-address?back=order`
      : `/update-address/${props.id}`;
    navigate(updateAddressUrl);
    // navigate(`/update-address/${props.id}`);
  };

  return (
    <GridItem>
      <Card
        border={props.isSelected ? "1px solid #53B175" : "1px solid #E2E8F0"}
        bgColor={props.isSelected ? "#e0f1e6" : "rgba(226, 232, 240, 0.1)"}
        cursor={props.isDisabled ? "not-allowed" : "pointer"}
        onClick={() => {
          if (!props.isDisabled) {
            handleClick();
          }
        }}
      >
        <CardBody px={"20px"}>
          <VStack spacing={"2px"} alignItems={"start"}>
            <HStack width={"100%"}>
              <AddressLabel
                isOutOfCoverage={props.isDisabled}
                addressName={props.addressName}
              />
              {props.isDefault ? <AddressTag /> : null}
            </HStack>
            <AddressName name={props.name} />
            <Text fontSize={"xs"}>{props.phoneNumber}</Text>
            <Text fontSize={"xs"}>{props.address}</Text>
            <ChangeAddressBtn callback={handleUpdate} isDisabled={false} />
          </VStack>
        </CardBody>
      </Card>
    </GridItem>
  );
}
