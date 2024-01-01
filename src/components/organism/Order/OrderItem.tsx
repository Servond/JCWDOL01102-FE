import { Divider, HStack, Img, Text, VStack } from "@chakra-ui/react";

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
          src={props.imgUrl}
          borderRadius={"5px"}
          crossOrigin='anonymous'
          w={"75px"}
          h={"75px"}
          objectFit={"contain"}
          border={"1px solid #E2E2E2"}
        />
        <VStack alignItems={"flex-start"} width={"100%"}>
          <Text fontSize={"medium"}>{props.name}</Text>
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
