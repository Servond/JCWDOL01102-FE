import { VStack } from "@chakra-ui/react";
import ProductCartList from "../../components/molecules/cart/ProductCartList";
import Checkout from "../../components/molecules/cart/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import CartEmpty from "../../components/atoms/cart/CartEmpty";
import { fetchProductCart } from "../../app/redux/slice/cart/getProductCart";
import { useEffect } from "react";
import Header from "../../components/molecules/cart/Header";

export default function CartPage() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.login.user);
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (carts.length > 0 || !isAuthenticated) {
      return;
    }
    dispatch(
      fetchProductCart({
        branchId: branchId
          ? branchId
          : JSON.parse(localStorage.getItem("branch")!).id,
        userId: user?.userId,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const carts = useSelector((state: RootState) => state.getCart.cart);
  return carts.length === 0 ? (
    <CartEmpty />
  ) : (
    <VStack w={"full"} pt={"1rem"} pb={"99px"} align={"start"}>
      <Header />
      <ProductCartList cart={carts} />
      <Checkout />
    </VStack>
  );
}
