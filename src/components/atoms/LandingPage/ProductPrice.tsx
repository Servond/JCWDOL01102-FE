import { Heading, VStack } from "@chakra-ui/layout";
import { IPromotionAttributes } from "../../../data/promotion/interface";
import { convertToRupiah } from "../../../utils/function/convertToRupiah";
import ProductDiscount from "./ProductDiscount";
import { DiscountValueType } from "../../../data/constants";

interface IProductPriceProps {
  promo?: IPromotionAttributes;
  price: number;
  variant: "productDetails" | "productCard";
}
export default function ProductPrice(props: IProductPriceProps) {
  const calculateDiscount = (
    price: number,
    valueType?: string | null,
    value?: number | null
  ) => {
    if (valueType === DiscountValueType.PERCENTAGE) {
      const discount: number = Math.round((price * Number(value)) / 100);
      const finalPrice: number = price - discount;
      return convertToRupiah(finalPrice);
    } else if (valueType === DiscountValueType.FIXED_PRICE) {
      const finalPrice = price - Number(value);
      return finalPrice <= 0 ? "Invalid" : convertToRupiah(finalPrice);
    } else {
      return "Invalid";
    }
  };
  return (
    <VStack w={"full"} align={"start"} spacing={"2px"}>
      <Heading
        fontSize={props.variant === "productCard" ? "18px" : "24px"}
        color={"primaryColor"}
      >
        {props.promo
          ? calculateDiscount(
              props.price,
              props.promo?.valueType,
              props.promo?.value
            )
          : convertToRupiah(props.price)}
      </Heading>
      {props.promo ? (
        <ProductDiscount
          price={props.price}
          type={props.promo?.type}
          value={props.promo?.value}
          valueType={props.promo?.valueType}
        />
      ) : null}
    </VStack>
  );
}
