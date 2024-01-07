import { Card, CardBody } from "@chakra-ui/card";
import { Image } from "@chakra-ui/image";
import { Heading, Text, VStack, Flex } from "@chakra-ui/layout";
import { FaBagShopping } from "react-icons/fa6";
import { IProductLandingPage } from "../../../data/product/interface";
import ProductPrice from "../../atoms/LandingPage/ProductPrice";
import { Skeleton } from "@chakra-ui/skeleton";
import { useState } from "react";
import { useMediaQuery, HStack, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

interface IProductCardProps {
  product: IProductLandingPage;
}

export default function ProductCard(props: IProductCardProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isMediumMobile] = useMediaQuery(
    "(min-width: 320px) and (max-width: 425px)"
  );
  const navigate = useNavigate();

  const onLoad = () => setIsLoaded(true);
  const onClick = () => navigate("/product-details", { state: props.product });
  return (
    <Card
      bg={"white"}
      w={"full"}
      borderRadius={"10px"}
      shadow={"md"}
      _hover={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <CardBody w={"full"} p={"1rem"}>
        <VStack w={"full"} align={"start"}>
          <Skeleton w={"full"} h={"150px"} isLoaded={isLoaded}>
            <Image
              onLoad={onLoad}
              onError={onLoad}
              src={`http://${import.meta.env.VITE_SERVER_HOST}${
                props.product.imageUrl
              }`}
              alt="product picture"
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
          </VStack>
          <Flex
            w={"full"}
            flexDir={isMediumMobile ? "column" : "row"}
            justify={"space-between"}
            align={"center"}
          >
            <ProductPrice
              promo={props.product.promotion[0]}
              price={props.product.price}
            />
            <IconButton
              _hover={{ fontSize: "24px", transition: "0.2s ease" }}
              transition={"0.2s ease"}
              aria-label=""
              borderRadius={isMediumMobile ? "10px" : "full"}
              mt={isMediumMobile ? "1rem" : "none"}
              w={isMediumMobile ? "full" : "auto"}
              icon={
                <HStack>
                  <FaBagShopping />
                  {isMediumMobile ? <Text>Buy</Text> : null}
                </HStack>
              }
            />
          </Flex>
        </VStack>
      </CardBody>
    </Card>
  );
}
