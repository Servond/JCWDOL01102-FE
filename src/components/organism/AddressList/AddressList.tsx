import { Grid, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddressList,
  setAddressList,
} from "../../../app/redux/slice/AddressList/addressListSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import AddressCard from "../../molecules/AddressList/AddressCard";
import LoadingCenter from "../../molecules/Loading";
import haversine from "haversine-distance";

export default function AddressList() {
  const addressListState = useSelector((state: RootState) => state.addressList);
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  const getLocationAndUpdateList = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
          });
        }
      );

      const { latitude, longitude } = position.coords;
      const userLocation = { latitude, longitude };

      const newAddressList = addressListState.addressList.map((address) => {
        const branchLocation = {
          latitude: parseFloat(address.latitude),
          longitude: parseFloat(address.longitude),
        };
        const distance = haversine(userLocation, branchLocation);
        return {
          ...address,
          isDisabled: distance > 35000,
        };
      });

      dispatch(setAddressList(newAddressList));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    dispatch(fetchAddressList(loginState.user?.userId as number)).then(() => {
      // getLocationAndUpdateList();
    });
  }, [dispatch, loginState]);

  useEffect(() => {
    if (addressListState.status === "done") getLocationAndUpdateList();
  }, [dispatch, addressListState.status]);

  if (
    addressListState.status === "pending" ||
    addressListState.status === "idle"
  )
    return <LoadingCenter />;

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
            isDisabled={address.isDisabled!}
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

//  --------------------------------------------------------------------------------------------
// import { Grid, Text } from "@chakra-ui/react";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAddressList,
//   setAddressList,
// } from "../../../app/redux/slice/AddressList/addressListSlice";
// import { AppDispatch, RootState } from "../../../app/redux/store";
// import AddressCard from "../../molecules/AddressList/AddressCard";
// import LoadingCenter from "../../molecules/Loading";
// import haversine from "haversine-distance";

// export default function AddressList() {
//   const { addressList, selectedAddressId, status } = useSelector(
//     (state: RootState) => state.addressList
//   );
//   const { user } = useSelector((state: RootState) => state.login);
//   const dispatch = useDispatch<AppDispatch>();

//   const getLocationAndUpdateList = async () => {
//     try {
//       const position = await new Promise<GeolocationPosition>(
//         (resolve, reject) => {
//           navigator.geolocation.getCurrentPosition(resolve, reject, {
//             enableHighAccuracy: true,
//           });
//         }
//       );

//       const { latitude, longitude } = position.coords;
//       const userLocation = { latitude, longitude };

//       const newAddressList = addressList.map((address) => {
//         const branchLocation = {
//           latitude: parseFloat(address.latitude),
//           longitude: parseFloat(address.longitude),
//         };
//         const distance = haversine(userLocation, branchLocation);
//         return {
//           ...address,
//           isDisabled: distance > 35000,
//         };
//       });

//       dispatch(setAddressList(newAddressList));
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     if (user?.userId) {
//       dispatch(fetchAddressList(user.userId)).then(() => {
//         if (addressList.length > 0) getLocationAndUpdateList();
//       });
//     }
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (addressList.length > 0) getLocationAndUpdateList();
//   }, [, dispatch]);

//   if (status === "pending" || status === "idle") {
//     return <LoadingCenter />;
//   }

//   if (status === "done" && addressList.length === 0) {
//     return (
//       <Text fontSize={"sm"} color={"gray.500"} textAlign={"center"} mt={"20px"}>
//         Anda belum memiliki alamat
//       </Text>
//     );
//   }

//   return (
//     <Grid
//       templateColumns={"repeat(1, 1fr)"}
//       width={"100%"}
//       gap={"10px"}
//       pb={"80px"}
//     >
//       {addressList.map((address, index) => (
//         <AddressCard
//           isDisabled={address.isDisabled!}
//           key={index}
//           addressName={address.name}
//           name={address.name}
//           phoneNumber={address.phoneNumber}
//           address={address.address}
//           isDefault={address.isDefault}
//           isSelected={
//             selectedAddressId
//               ? selectedAddressId === address.id
//               : address.isDefault
//           }
//           id={address.id}
//         />
//       ))}
//     </Grid>
//   );
// }
