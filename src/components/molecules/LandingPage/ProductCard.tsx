import { Card, CardBody } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Heading, Text, VStack, Flex } from "@chakra-ui/layout";
import { FaBagShopping } from "react-icons/fa6";
import { IProductLandingPage } from "../../../data/product/interface";
import ProductPrice from "../../atoms/LandingPage/ProductPrice";
import { Skeleton } from "@chakra-ui/skeleton";
import { useState } from "react";
import { useMediaQuery, HStack, IconButton, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { manageProductCart } from "../../../app/redux/slice/cart/manageCart";
import { fetchProductCart } from "../../../app/redux/slice/cart/getProductCart";
// import { useEffect } from "react";

interface IProductCardProps {
  product: IProductLandingPage;
}

export default function ProductCard(props: IProductCardProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isManaging, setIsManaging] = useState<boolean>(false);
  const [isMediumMobile] = useMediaQuery(
    "(min-width: 320px) and (max-width: 425px)"
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  const onLoad = () => setIsLoaded(true);
  const onClick = () => navigate("/product-details", { state: props.product });
  const userId = useSelector((state: RootState) => state.login.user?.userId);
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  const isAuthentcated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const carts = useSelector((state: RootState) => state.getCart.cart);

  const onAddCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsManaging(true);
    e.stopPropagation();
    const index = carts.findIndex(
      (item) => props.product.id === item.product.id
    );
    let quantity: number;
    if (carts.length === 0 || index < 0) {
      quantity = 1;
    } else {
      quantity = carts[index].qty + 1;
    }
    dispatch(
      manageProductCart({
        action: "add",
        data: {
          qty: quantity,
          productId: index !== -1 ? undefined : props.product.id,
          userId: index !== -1 ? undefined : userId,
          branchId: index !== -1 ? undefined : branchId,
        },
        userId: userId!,
        productId: props.product.id,
        branchId: branchId
          ? branchId
          : JSON.parse(localStorage.getItem("branch")!).id,
      })
    ).then((data) => {
      setIsManaging(false);
      const isSuccess = data.payload?.statusCode?.toString().startsWith("2");
      dispatch(fetchProductCart({ userId, branchId }));
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
    <Card
      bg={"white"}
      w={"full"}
      borderRadius={"10px"}
      shadow={"md"}
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
      opacity={props.product.stock === 0 ? "50%" : "100%"}
    >
      <CardBody w={"full"} p={"1rem"} position={"relative"}>
        <VStack w={"full"} align={"start"}>
          <Skeleton w={"full"} h={"150px"} isLoaded={isLoaded}>
            <Image
              onLoad={onLoad}
              onError={onLoad}
              src={`${import.meta.env.VITE_SERVER_URL}${
                props.product.imageUrl
              }`}
              alt='product picture'
              h={"100%"}
              w={"100%"}
              objectFit={"contain"}
            />
          </Skeleton>

          <VStack w={"full"} spacing={"0px"} align={"start"}>
            <Heading fontSize={"1rem"} fontWeight={"semibold"} noOfLines={2}>
              {props.product.name}
            </Heading>
            <Text
              fontSize={"14px"}
              color={"secondaryColor"}
            >{`${props.product.weight} g`}</Text>
            H
          </VStack>
          <Flex
            w={"full"}
            flexDir={isMediumMobile ? "column" : "row"}
            justify={"space-between"}
            align={"center"}
          >
            <ProductPrice
              variant='productCard'
              promo={props.product.promotion[0]}
              price={props.product.price}
            />
            <IconButton
              isDisabled={!isAuthentcated || props.product.stock === 0}
              _hover={{ fontSize: "24px", transition: "0.2s ease" }}
              transition={"0.2s ease"}
              aria-label=''
              borderRadius={isMediumMobile ? "10px" : "full"}
              mt={isMediumMobile ? "1rem" : "none"}
              w={isMediumMobile ? "full" : "auto"}
              onClick={onAddCart}
              isLoading={isManaging}
              icon={
                <HStack>
                  <FaBagShopping />
                  {isMediumMobile ? <Text>Buy</Text> : null}
                </HStack>
              }
            />
          </Flex>
          {props.product.stock === 0 && (
            <Heading
              // position={"absolute"}
              top={"90px"}
              // left={"20%"}
              fontSize={"16px"}
              // transform={"rotate(-30deg)"}
              color={"red"}
              // shadow={"md"}
              // bg={"white"}
            >
              Sold Out
            </Heading>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
}
