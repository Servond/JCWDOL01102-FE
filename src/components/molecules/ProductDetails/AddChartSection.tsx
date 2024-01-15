import {
  Button,
  HStack,
  Heading,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import QuantityButton from "../../atoms/ProductDetails/QuantityButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { manageProductCart } from "../../../app/redux/slice/cart/manageCart";
import { fetchProductCart } from "../../../app/redux/slice/cart/getProductCart";

interface IAddChartSectionProps {
  flexGrow: string;
  productId: number;
  stock: number;
}

export default function AddChartSection(props: IAddChartSectionProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [quantity, setQuantity] = useState<number>(0);
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.login.user?.userId);
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const apaiState = useSelector(
    (state: RootState) => state.manageCart.apiState
  );
  const carts = useSelector((state: RootState) => state.getCart.cart);
  const generateCheckoutFailCheck = () => {
    if (!isAuthenticated) {
      return "Please login to buy our grocery";
    } else if (props.stock === 0) {
      return "Sold Out";
    }
  };
  const onAddCart = () => {
    console.log(quantity);
    const index = carts.findIndex(
      (item) => props.productId === item.product.id
    );
    console.log("index : ", index);
    let quantityFinal: number;
    if (carts.length === 0 || index < 0) {
      quantityFinal = quantity;
    } else {
      quantityFinal = carts[index].qty + quantity;
    }
    dispatch(
      manageProductCart({
        action: "add",
        data: {
          qty: quantityFinal,
          productId: index !== -1 ? undefined : props.productId,
          userId: index !== -1 ? undefined : userId,
          branchId: index !== -1 ? undefined : branchId,
        },
        userId: userId!,
        productId: props.productId,
        branchId: branchId
          ? branchId
          : JSON.parse(localStorage.getItem("branch")!).id,
      })
    ).then((data) => {
      const isSuccess = data.payload?.statusCode?.toString().startsWith("2");
      dispatch(
        fetchProductCart({
          userId,
          branchId: branchId
            ? branchId
            : JSON.parse(localStorage.getItem("branch")!).id,
        })
      );
      toast({
        duration: 3000,
        position: "top",
        title: "Cart",
        description: isSuccess
          ? "Product was successfully added to cart"
          : "Something wrong, Product cannot be add to cart",
        status: isSuccess ? "success" : "error",
        isClosable: true,
      });
    });
  };
  return (
    <VStack
      w={"full"}
      flexGrow={props.flexGrow}
      justify={"end"}
      position={"sticky"}
      bottom={"0px"}
    >
      <HStack
        w={isMobile ? `${window.screen.width}px` : "500px"}
        p={"1rem"}
        bg={"white"}
        justify={"space-between"}
        boxShadow={"0 -2px 6px -1px rgba(0, 0, 0, 0.1)"}
      >
        {isAuthenticated && props.stock > 0 ? (
          <>
            <QuantityButton
              stock={props.stock}
              onQuantityChange={setQuantity}
              variant="ProductDetail"
            />
            <Button onClick={onAddCart} isLoading={apaiState === "pending"}>
              Add to Cart
            </Button>
          </>
        ) : (
          <Heading fontSize={"16px"} color={"secondaryColor"}>
            {generateCheckoutFailCheck()}
          </Heading>
        )}
      </HStack>
    </VStack>
  );
}
