import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { manageProductCart } from "../../../app/redux/slice/cart/manageCart";
import { fetchProductCart } from "../../../app/redux/slice/cart/getProductCart";

interface IQuantityButtonProps {
  variant: "ProductCart" | "ProductDetail";
  stock: number;
  initialQty?: number | undefined;
  userId?: number;
  branchId?: number;
  productId?: number;
  onQuantityChange?: React.Dispatch<React.SetStateAction<number>>;
}

export default function QuantityButton(
  props: IQuantityButtonProps = {
    initialQty: 1,
    variant: "ProductDetail",
    stock: 1,
  }
) {
  const [quantity, setQuantity] = useState<number>(
    props.initialQty ? props.initialQty : 1
  );
  const quantityBefore = useRef<number>(quantity);

  useEffect(() => {
    if (props.variant === "ProductCart") {
      return;
    }
    props.onQuantityChange?.(quantity);
  }, [quantity]);

  useEffect(() => {
    if (
      quantityBefore.current === quantity ||
      props.variant === "ProductDetail"
    ) {
      return;
    }
    manageCart(quantityBefore.current > quantity ? "reduce" : "add");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);
  const dispatch = useDispatch<AppDispatch>();
  const manageCart = (action: "add" | "reduce") => {
    dispatch(
      manageProductCart({
        action,
        data: {
          qty: quantity,
        },
        userId: props.userId!,
        productId: props.productId!,
        branchId: props.branchId!,
      })
    ).then((data) => {
      const isSuccess = data.payload?.statusCode?.toString().startsWith("2");
      if (!isSuccess) {
        setQuantity(quantityBefore.current);
        return;
      }
      dispatch(
        fetchProductCart({ userId: props.userId, branchId: props.branchId })
      );
    });
  };
  const afterAction = () => {
    if (props.variant === "ProductCart") {
      quantityBefore.current = quantity;
    }
  };
  const onAdd = () => {
    setQuantity(quantity + 1);
    afterAction();
  };
  const onMin = () => {
    setQuantity(quantity - 1);
    afterAction();
  };
  return (
    <HStack
      p={"8px"}
      borderRadius={"10px"}
      border={"0.5px solid"}
      minW={"60px"}
      justify={"space-between"}
      padding={"2px"}
      borderColor={"primaryColor"}
    >
      <IconButton
        aria-label=""
        icon={
          <Box fontSize={"16px"}>
            <FaMinus />
          </Box>
        }
        borderColor={"primaryColor"}
        onClick={onMin}
        borderRadius={"full"}
        // border={"2px solid"}
        bg={"transparent"}
        color={"primaryColor"}
        size={"sm"}
        isDisabled={quantity === 1}
        _hover={{ cursor: quantity === 1 ? "disable" : "pointer" }}
      />
      <Text>{quantity}</Text>
      <IconButton
        aria-label=""
        icon={
          <Box fontSize={"16px"}>
            <FaPlus />
          </Box>
        }
        onClick={onAdd}
        borderRadius={"full"}
        // border={"2px solid"}
        bg={"transparent"}
        color={"primaryColor"}
        isDisabled={quantity === props.stock}
        size={"sm"}
      />
    </HStack>
  );
}
