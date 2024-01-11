import { Box, useToast } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { manageProductCart } from "../../../app/redux/slice/cart/manageCart";
import { fetchProductCart } from "../../../app/redux/slice/cart/getProductCart";
import Loading from "../Loading";
import { useState } from "react";

interface IDeleteButtonProps {
  productId: number;
  userId: number;
  branchId: number;
}

export default function DeleteButton(props: IDeleteButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const toast = useToast();
  const onDelete = () => {
    setDeleting(true);
    dispatch(
      manageProductCart({
        action: "reduce",
        data: {
          qty: 0,
        },
        userId: props.userId!,
        productId: props.productId,
        branchId: props.branchId
          ? props.branchId
          : JSON.parse(localStorage.getItem("branch")!).id,
      })
    ).then((data) => {
      setDeleting(false);
      dispatch(
        fetchProductCart({ userId: props.userId, branchId: props.branchId })
      );
      toast({
        duration: 3000,
        position: "top",
        title: "Cart",
        description: data.payload?.statusCode?.toString().startsWith("2")
          ? "Product was successfully deleted"
          : "Product was failed to delete",
        status: data.payload?.statusCode?.toString().startsWith("2")
          ? "success"
          : "error",
        isClosable: true,
      });
    });
  };
  return (
    <Box
      color={"errorColor"}
      fontSize={"20px"}
      _hover={{ cursor: "pointer" }}
      onClick={onDelete}
    >
      {isDeleting ? <Loading size={"20px"} /> : <FaTrashAlt />}
    </Box>
  );
}
