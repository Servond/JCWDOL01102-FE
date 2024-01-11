import { Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import { DiscountValueType, PromotionType } from "../../../data/constants";
import { convertToRupiah } from "../../../utils/function/convertToRupiah";
import { useEffect, useState } from "react";

export default function TotalPrice() {
  const carts = useSelector((state: RootState) => state.getCart.cart);
  const [total, setTotal] = useState<number>(0);
  const manageApiState = useSelector(
    (state: RootState) => state.manageCart.apiState
  );
  const getCartApiState = useSelector(
    (state: RootState) => state.getCart.apiState
  );
  const calculateTotalPrice = () => {
    const total = carts.reduce((totalPrice, item) => {
      if (
        item.product.promotion[0] &&
        item.product.promotion[0].type === PromotionType.PRICE_CUT &&
        item.product.promotion[0].valueType === DiscountValueType.PERCENTAGE
      ) {
        const finalPrice =
          item.product.price -
          Math.round(
            (item.product.price * Number(item.product.promotion[0].value)) / 100
          );
        return totalPrice + finalPrice * item.qty;
      } else if (
        item.product.promotion[0] &&
        item.product.promotion[0].type === PromotionType.PRICE_CUT &&
        item.product.promotion[0].valueType === DiscountValueType.FIXED_PRICE
      ) {
        const finalPrice =
          item.product.price - Number(item.product.promotion[0].value);
        return totalPrice + finalPrice * item.qty;
      } else {
        return totalPrice + item.product.price * item.qty;
      }
    }, 0);
    return total;
  };
  useEffect(() => {
    setTotal(calculateTotalPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts]);

  return (
    <VStack spacing={"2px"} align={"start"} w={"auto"}>
      <Text fontSize={"16px"} fontWeight={"semibold"} color={"secondaryColor"}>
        Total price
      </Text>
      <Skeleton
        w={"100px"}
        h={"20px"}
        isLoaded={
          !(manageApiState === "pending") && !(getCartApiState === "pending")
        }
      >
        <Heading fontSize={"20px"} whiteSpace={"nowrap"}>
          {carts.length > 0 && convertToRupiah(total)}
        </Heading>
      </Skeleton>
    </VStack>
  );
}
