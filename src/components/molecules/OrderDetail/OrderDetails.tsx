import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  VStack,
} from "@chakra-ui/react";
import OrderItem from "../../organism/Order/OrderItem";
import { IDetailOrder } from "../../../data/OrderDetail/interface";

interface IOrderDetailsProps {
  details: IDetailOrder[];
}

export default function OrderDetails(props: IOrderDetailsProps) {
  return (
    <Card width={"100%"} shadow={"md"}>
      <CardHeader>
        <Heading fontWeight={"bold"} fontSize={"20px"}>
          Order Details
        </Heading>
      </CardHeader>
      <CardBody maxH={"260px"} overflowY={"auto"}>
        <VStack justify={"start"} align={"start"}>
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
                {index < props.details.length - 1 ? (
                  <Divider key={index} />
                ) : null}
              </>
            ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
