import { Grid } from "@chakra-ui/react";
import AddressCard from "../../molecules/AddressList/AddressCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

export default function AddressList() {
  const addressListState = useSelector((state: RootState) => state.addressList);

  return (
    <Grid
      templateColumns={"repeat(1, 1fr)"}
      width={"100%"}
      gap={"10px"}
      pb={"80px"}
    >
      {addressListState.addressList.map((address, index) => {
        const defaultValue = addressListState.selectedAddressId
          ? addressListState.selectedAddressId === address.id
          : address.isDefault;
        return (
          <AddressCard
            key={index}
            addressName={address.addressName}
            name={address.name}
            phoneNumber={address.phoneNumber}
            address={address.address}
            isDefault={address.isDefault}
            isSelected={defaultValue}
            id={address.id}
          />
        );
      })}
    </Grid>
  );
}
