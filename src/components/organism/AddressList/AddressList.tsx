import { Grid, Text } from "@chakra-ui/react";
import AddressCard from "../../molecules/AddressList/AddressCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect } from "react";
import { fetchAddressList } from "../../../app/redux/slice/AddressList/addressListSlice";

export default function AddressList() {
  const addressListState = useSelector((state: RootState) => state.addressList);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAddressList(1));
  }, [dispatch]);

  if (
    addressListState.status === "pending" ||
    addressListState.status === "idle"
  )
    return (
      <Text fontSize={"sm"} color={"gray.500"} textAlign={"center"} mt={"20px"}>
        Loading...
      </Text>
    );

  if (
    addressListState.status === "done" &&
    addressListState.addressList.length === 0
  ) {
    return (
      <Text fontSize={"sm"} color={"gray.500"} textAlign={"center"} mt={"20px"}>
        Anda belum memiliki alamat
      </Text>
    );
  }
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
            addressName={address.name}
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
