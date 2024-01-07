import { Badge, Flex, Text } from "@chakra-ui/layout";
import { convertToRupiah } from "../../../utils/function/convertToRupiah";
import { DiscountValueType, PromotionType } from "../../../data/constants";

interface ProductDiscountProps {
  price: number;
  type: string | undefined | null;
  value?: number | null;
  valueType: string | undefined | null;
}

export default function ProductDiscount(props: ProductDiscountProps) {
  const badgeText = (value: number, valueType: string, type: string) => {
    if (type === PromotionType.BUY_ONE_GET_ONE) {
      return "Buy one get one";
    } else if (
      type === PromotionType.PRICE_CUT &&
      valueType === DiscountValueType.PERCENTAGE
    ) {
      return `${value}%`;
    } else {
      return "Invalid";
    }
  };
  return (
    <Flex
      flexDir={
        props.type === PromotionType.PRICE_CUT &&
        props.valueType === DiscountValueType.PERCENTAGE
          ? "row"
          : "column"
      }
      w={"full"}
    >
      <Text
        fontSize={"14px"}
        color={"secondaryColor"}
        as="del"
        mr={"4px"}
        mb={props.valueType === DiscountValueType.PERCENTAGE ? "0px" : "2px"}
      >
        {convertToRupiah(props.price)}
      </Text>
      {props.valueType === DiscountValueType.FIXED_PRICE ? (
        <Text fontWeight={"bold"} fontSize={"14px"} color={"orange"}>{`Hemat ${convertToRupiah(
          props.value!
        )}`}</Text>
      ) : (
        <Badge
          fontSize={"11px"}
          borderRadius={"4px"}
          bg={"orange"}
          color={"white"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          textAlign={"center"}
          maxW={"70%"}
          textTransform={"capitalize"}
          px={"4px"}
        >
          {badgeText(props.value!, props.valueType!, props.type!)}
        </Badge>
      )}
    </Flex>
  );
}
