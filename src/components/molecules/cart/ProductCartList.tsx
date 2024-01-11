import { VStack } from "@chakra-ui/react";
import ProductCart from "./ProductCart";
import { ICartAttributes } from "../../../data/cart/interface";

interface IProductCartListProps {
  cart: ICartAttributes[];
}
export default function ProductCartList(props: IProductCartListProps) {
  return (
    <VStack w={"full"} spacing={"8px"}>
      {props.cart.map((item, key) => (
        <ProductCart product={item.product} qty={item.qty} key={key} />
      ))}
    </VStack>
  );
}
