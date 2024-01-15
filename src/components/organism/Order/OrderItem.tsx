import { HStack, Img, Tag, Text, VStack } from "@chakra-ui/react";
import { convertToRupiah } from "../../../utils/function/convertToRupiah";

interface OrderItemProps {
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
  promoType?: string;
  promoTypeValue?: string;
  promoValue?: number;
}

export default function OrderItem(props: OrderItemProps) {
  const promoTag = () => {
    if (
      props.promoType === "price_cut" &&
      props.promoValue &&
      props.promoTypeValue
    ) {
      if (props.promoTypeValue === "percentage") {
        return (
          <Tag colorScheme="yellow">{`Discount ${props.promoValue}%`}</Tag>
        );
      }
      if (props.promoTypeValue === "fixed_price") {
        return (
          <Tag colorScheme="yellow">{`Discount ${convertToRupiah(
            props.promoValue
          )}`}</Tag>
        );
      }
    }
    if (props.promoType === "buy_one_get_one") {
      return <Tag colorScheme="yellow">{"Buy One Get One"}</Tag>;
    }
  };
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
          objectFit={"cover"}
          border={"1px solid #E2E2E2"}
        />
        <VStack
          alignItems={"flex-start"}
          width={"100%"}
          spacing={"2px"}
          borderRadius={"10px"}
        >
          <HStack>
            <Text fontSize={"16px"} fontWeight={"semibold"}>
              {props.name}
            </Text>

            {promoTag()}
          </HStack>
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
