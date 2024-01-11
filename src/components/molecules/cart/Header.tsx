import { Button, HStack, Heading, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { ClearProductCart } from "../../../app/redux/slice/cart/clearCart";
import { fetchProductCart } from "../../../app/redux/slice/cart/getProductCart";

export default function Header() {
  const clearCart = useSelector((state: RootState) => state.clearCart);
  const cart = useSelector((state: RootState) => state.getCart.cart);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const userId = useSelector((state: RootState) => state.login.user?.userId);
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  const onDelete = () => {
    dispatch(ClearProductCart(cart)).then((data) => {
      const isSuccess = data.payload?.statusCode?.toString().startsWith("2");
      dispatch(fetchProductCart({ userId, branchId }));
      toast({
        duration: 3000,
        position: "top",
        title: "Cart",
        description: isSuccess
          ? "Cart was successfully cleared"
          : "Something wrong, Product cannot be deleted from cart",
        status: isSuccess ? "success" : "error",
        isClosable: true,
      });
    });
  };
  return (
    <HStack w={"full"} justify={"space-between"}>
      <Heading mb={"1rem"}>Cart</Heading>
      <Button
        bg={"errorColor"}
        isLoading={clearCart.apiState === "pending"}
        onClick={onDelete}
      >
        Clear All
      </Button>
    </HStack>
  );
}
