import { HStack, Img, Text, VStack } from "@chakra-ui/react";
import { convertToRupiah } from "../../../utils/function/convertToRupiah";

interface OrderItemProps {
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
}

export default function OrderItem(props: OrderItemProps) {
  return (
    <>
      <HStack>
        <Img
          as={"img"}
          src={`${import.meta.env.VITE_SERVER_URL}${props.imgUrl}`}
          borderRadius={"5px"}
          crossOrigin="anonymous"
          w={"75px"}
          h={"75px"}
          objectFit={"contain"}
          border={"1px solid #E2E2E2"}
        />
        <VStack
          alignItems={"flex-start"}
          width={"100%"}
          spacing={"2px"}
          borderRadius={"10px"}
        >
          <Text fontSize={"16px"} fontWeight={"semibold"}>
            {props.name}
          </Text>
          <Text
            fontSize={"14px"}
            color={"secondaryColor"}
          >{`Qty : ${props.quantity}`}</Text>
          <Text fontSize={"18px"} fontWeight={"bold"}>
            {convertToRupiah(props.price)}
          </Text>
        </VStack>
      </HStack>
    </>
  );
}
