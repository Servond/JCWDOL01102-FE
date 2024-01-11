import {
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IProductLandingPage } from "../../../data/product/interface";
import ProductPrice from "../../atoms/LandingPage/ProductPrice";
import QuantityButton from "../../atoms/ProductDetails/QuantityButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";
import DeleteButton from "../../atoms/cart/DeleteButton";

interface IProductCartProps {
  product: IProductLandingPage;
  qty: number;
}

export default function ProductCart(props: IProductCartProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const onLoad = () => setIsLoaded(true);
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  const userId = useSelector((state: RootState) => state.login.user?.userId);
  return (
    <Card w={"full"}>
      <CardBody>
        <HStack w={"full"} justify={"space-between"} align={"start"} spacing={"1rem"}>
          <Skeleton h={"60px"} w={"60px"} isLoaded={isLoaded}>
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
            <HStack w={"full"} justify={"space-around"}>
              <ProductPrice
                variant="productCard"
                promo={props.product.promotion[0]}
                price={props.product.price}
              />
              <HStack spacing={"10px"}>
                <DeleteButton
                  branchId={
                    branchId
                      ? branchId
                      : JSON.parse(localStorage.getItem("branch")!).id
                  }
                  productId={props.product.id}
                  userId={userId!}
                />
                <QuantityButton
                  initialQty={props.qty}
                  branchId={
                    branchId
                      ? branchId
                      : JSON.parse(localStorage.getItem("branch")!).id
                  }
                  productId={props.product.id}
                  userId={userId}
                  variant="ProductCart"
                />
              </HStack>
            </HStack>
          </VStack>
        </HStack>
      </CardBody>
    </Card>
  );
}
