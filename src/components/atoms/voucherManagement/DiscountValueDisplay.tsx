import { Text } from "@chakra-ui/react";
import {
  DiscountValueType,
  VoucherType,
} from "../../../data/constants";

interface IDiscountValueProps {
  value: number;
  valueType: string;
  type: string;
}

const generateValue = (
  value: number,
  valueType: string,
  discountType: string
): string => {
  if (discountType === VoucherType.FREE_SHIPPING) {
    return "Full Price";
  }
  if (valueType === DiscountValueType.PERCENTAGE) {
    return `${value.toString()}%`;
  } else if (valueType === DiscountValueType.FIXED_PRICE) {
    return `${value.toLocaleString("id-ID", {
      currency: "IDR",
      style: "currency",
    })}`;
  }
  return "";
};
export default function DiscountValueDisplay(props: IDiscountValueProps) {
  return (
    <Text fontWeight={"semibold"}>
      {generateValue(props.value, props.valueType, props.type)}
    </Text>
  );
}
