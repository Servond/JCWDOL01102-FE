import { Box, Divider, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import {
  setCourier,
  setDataOrder,
  setIsOpenDrawer,
  setShippingAmount,
  setTotalAmount,
} from "../../../app/redux/slice/Order/OrderSlice";

interface ShipperProps {
  shipper: "JNE" | "TIKI" | "POS";
  name: string;
  code: string;
  price: number;
  duration: string;
  isOpen: boolean;
}

export default function Shipper(props: ShipperProps) {
  const orderState = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeCourier = () => {
    dispatch(
      setDataOrder({
        courier: {
          shipper: props.shipper,
          code: props.code,
          name: props.name,
          price: props.price,
          etd: props.duration,
          image:
            props.shipper === "JNE"
              ? "./logo/jne.png"
              : props.shipper === "TIKI"
              ? "./logo/tiki.png"
              : "./logo/pos.png",
        },
      })
    );
    dispatch(setShippingAmount(props.price));
    dispatch(setTotalAmount(orderState.productAmount + props.price));
    dispatch(
      setDataOrder({
        totalAmount: orderState.productAmount + props.price,
      })
    );
  };
  return (
    <Box
      maxHeight={props.isOpen ? "fit-content" : "0"}
      overflow='hidden'
      transformOrigin='top'
      boxSizing='border-box'
      onClick={() => {
        dispatch(
          setCourier({
            name:
              props.shipper === "JNE"
                ? "Jalur Nugraha Ekakurir (JNE)"
                : props.shipper === "TIKI"
                ? "Titipan Kilat (TIKI)"
                : "POS Indonesia",
            code: props.code,
            price: props.price,
            etd: props.duration,
            image:
              props.shipper === "JNE"
                ? "./logo/jne.png"
                : props.shipper === "TIKI"
                ? "./logo/tiki.png"
                : "./logo/pos.png",
          })
        );
        dispatch(setIsOpenDrawer(false));
        handleChangeCourier();
      }}
    >
      <Divider my='10px' />
      <VStack
        alignItems='flex-start'
        gap='0px'
        cursor='pointer'
        _hover={{ fontWeight: "500" }}
        flexDirection='column' // Set flexDirection to "column"
      >
        <Text fontSize='medium'>
          {`${props.name} (${new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          }).format(props.price)})`}
        </Text>
        <Text fontSize='small' color='gray.600'>
          {`Estimasi ${props.duration} hari`}
        </Text>
      </VStack>
    </Box>
  );
}
