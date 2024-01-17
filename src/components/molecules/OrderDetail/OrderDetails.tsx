import { Card, CardBody, Heading, VStack } from "@chakra-ui/react";
import OrderItem from "../../organism/Order/OrderItem";
import { IDetailOrder } from "../../../data/OrderDetail/interface";

interface IOrderDetailsProps {
  details: IDetailOrder[];
}

export default function OrderDetails(props: IOrderDetailsProps) {
  return (
    <Card
      width={"100%"}
      shadow={"md"}
      minH={"300px"}
      borderRadius={"18px"}
      p={"1rem"}
    >
      <Heading fontWeight={"bold"} fontSize={"20px"} mb={"1rem"}>
        Order Details
      </Heading>
      <CardBody maxH={"300px"} overflowY={"auto"} p={0} pr={"1rem"}>
        <VStack justify={"start"} align={"start"} spacing={"8px"}>
          {props.details &&
            props.details.map((product, index) => (
              <>
                <OrderItem
                  key={index}
                  imgUrl={product.product.imageUrl}
                  name={product.product.name}
                  price={product.product.price}
                  quantity={product.qty}
                />
                {/* {index < props.details.length - 1 ? (
                    <Divider key={index} />
                  ) : null} */}
              </>
            ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
