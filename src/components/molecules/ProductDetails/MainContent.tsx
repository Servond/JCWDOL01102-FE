import { Heading, Image, Skeleton, VStack } from "@chakra-ui/react";
import { IProductLandingPage } from "../../../data/product/interface";
import ProductPrice from "../../atoms/LandingPage/ProductPrice";
import AddChartSection from "./AddChartSection";
import { useEffect, useRef, useState } from "react";

interface IMainContentProps {
  product: IProductLandingPage;
}

export default function MainContent(props: IMainContentProps) {
  useEffect(() => {
    if (
      Number(boxRef.current?.scrollHeight) >
      Number(boxRef.current?.clientHeight)
    ) {
      setOverflow(true);
    }
  }, []);
  const [isOverflow, setOverflow] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);
  return (
    <VStack mx={"-1rem"} ref={boxRef} h={"100dvh"}>
      <Skeleton w={"full"} isLoaded={isLoaded} h={isLoaded ? "auto" : "200px"}>
        <Image
          src={`http://${import.meta.env.VITE_SERVER_HOST}${
            props.product.imageUrl
          }`}
          alt="product picture"
          h={"100%"}
          w={"100%"}
          objectFit={"contain"}
          onLoad={() => setLoaded(true)}
        />
      </Skeleton>

      <VStack w={"full"} bg={"white"} p={"1rem"} align={"left"}>
        <ProductPrice
          variant="productDetails"
          price={props.product.price}
          promo={props.product.promotion[0]}
        />
        <Heading
          fontSize={"18px"}
          textAlign={"left"}
          fontWeight={"semibold"}
          noOfLines={1}
        >
          {props.product.name}
        </Heading>
        <Heading fontSize={"16px"} textAlign={"left"} color={"secondaryColor"}>
          {`${props.product.weight} g`}
        </Heading>
      </VStack>

      <VStack w={"full"} bg={"white"} p={"1rem"} align={"left"}>
        <Heading fontSize={"20px"} textAlign={"left"} noOfLines={1}>
          Description
        </Heading>
        <Heading
          fontSize={"16px"}
          textAlign={"left"}
          fontWeight={"normal"}
          noOfLines={1}
        >
          {props.product.desc}
        </Heading>
      </VStack>
      <AddChartSection flexGrow={!isOverflow ? "1" : "none"} />
    </VStack>
  );
}
