import { ICartAttributes } from "../../data/cart/interface";

export const isInCart = (cart: ICartAttributes[], toFind: number) => {
  return cart.some((item) => item.productId === toFind);
};
