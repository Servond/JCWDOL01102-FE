import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { toGMT7 } from "../../../utils/function/toGMT7";
import OrderInfoItem from "../../atoms/OrderDetail/OrderInfoItem";
import { convertToRupiah } from "../../../utils/function/convertToRupiah";

interface IOrderInfoProps {
  invoiceNo: string;
  address: string;
  transactionDate: string;
  total: number;
  onOpenStatus: () => void;
}

export default function OrderInfo(props: IOrderInfoProps) {
  return (
    <Card width={"100%"}>
      <CardHeader w={"full"} mb={"3px"} px={"1rem"} pt={"1rem"}>
        <Heading fontSize={"20px"}>Order Info</Heading>
      </CardHeader>
      {/* <Box px={"1rem"} mt={"8px"}>
        <Divider color={"secondaryColor"}/>
      </Box> */}
      <CardBody px={"1rem"} py={"8px"}>
        <VStack
          justifyContent={"start"}
          alignItems={"flex-start"}
          position={"relative"}
          spacing={"8px"}
        >
          <OrderInfoItem label="Order Number" value={props.invoiceNo} />
          <OrderInfoItem label="Address" value={props.address} />
          <OrderInfoItem
            label="Order Date"
            value={toGMT7(props.transactionDate)}
          />
          <OrderInfoItem
            label="Order Total"
            value={convertToRupiah(props.total)}
          />
          <Text
            color={"primaryColor"}
            cursor={"pointer"}
            onClick={props.onOpenStatus}
            mt={"8px"}
          >
            Lihat Status Pesanan
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
