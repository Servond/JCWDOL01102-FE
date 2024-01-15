import { HStack, Img, Tag, Text, VStack } from "@chakra-ui/react";
import { localeCurrency } from "../../../utils/function/localeCurrency";

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
          <Tag colorScheme='yellow'>{`Discount ${props.promoValue}%`}</Tag>
        );
      }
      if (props.promoTypeValue === "fixed_price") {
        return (
          <Tag colorScheme='yellow'>{`Discount ${localeCurrency(
            props.promoValue,
            "IDR"
          )}`}</Tag>
        );
      }
    }
    if (props.promoType === "buy_one_get_one") {
      return <Tag colorScheme='yellow'>{"Buy One Get One"}</Tag>;
    }
  };
  return (
    <>
      <HStack>
        <Img
          as={"img"}
          src={props.imgUrl}
          borderRadius={"5px"}
          crossOrigin='anonymous'
          w={"75px"}
          h={"75px"}
          objectFit={"cover"}
          border={"1px solid #E2E2E2"}
        />
        <VStack alignItems={"flex-start"} width={"100%"}>
          <HStack>
            <Text fontSize={"medium"}>{props.name}</Text>
            {promoTag()}
          </HStack>
          <Text fontSize={"medium"} fontWeight={"bold"}>
            {`${props.quantity} x ${new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 0,
            }).format(props.price)}`}
          </Text>
        </VStack>
      </HStack>
    </>
  );
}
