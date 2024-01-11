/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardBody,
  Divider,
  HStack,
  Img,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ChakraTable, {
  Column,
  DataType,
} from "../../../components/atoms/Table/Table";
import { localeCurrency } from "../../../utils/function/localeCurrency";
import { DateTime } from "luxon";
import OrderStatus from "../../../components/organism/Admin/OrderStatus/OrderStatus";
import OrderAction from "../../../components/organism/Admin/OrderAction/OrderAction";
import { orderStatusConstants } from "../../../data/order/orderStatusConstants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect, useState } from "react";
import { getOrderDetailDashboard } from "../../../app/redux/slice/Admin/orderManagement/orderDetailSlice";
interface IData extends DataType {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}
export default function OrderDetailmanagementPage() {
  const params = useParams<{ invoiceId: string }>();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const navigate = useNavigate();
  const backToOrderManagement = () => {
    navigate(-1);
  };
  const [data, setData] = useState<IData[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const orderDetailState = useSelector(
    (state: RootState) => state.orderDetailDashboard
  );
  useEffect(() => {
    if (params.invoiceId) {
      dispatch(getOrderDetailDashboard(params.invoiceId));
    }
  }, [dispatch, params.invoiceId, isRefresh]);

  useEffect(() => {
    console.log("update woi");
    console.log(orderDetailState.data?.data.order_details);
    if (orderDetailState.data?.data.order_details) {
      console.log("update woi 2");
      const payload: IData[] = orderDetailState.data?.data.order_details.map(
        (item) => ({
          key: item.productId.toString(),
          id: item.productId,
          image: `${import.meta.env.VITE_SERVER_URL}/api/document/${
            item.products.image.uniqueId
          }`,
          name: item.products.name,
          price: item.price,
          quantity: item.qty,
          total: item.qty * item.price,
        })
      );
      console.log(payload);
      setData(payload);
    }
  }, [orderDetailState.data?.data.order_details]);

  const columns: Column[] = [
    {
      key: "image",
      title: "Image",
      width: "90px",
      dataIndex: "image",
      render: (value) => (
        <Box
          width={"60px"}
          height={"60px"}
          bgPosition={"center"}
          borderRadius={"5px"}
          overflow={"hidden"}
        >
          <Img
            as={"img"}
            src={value as string}
            objectFit={"cover"}
            crossOrigin='anonymous'
          />
        </Box>
      ),
    },
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "price",
      title: "Price",
      dataIndex: "price",
      render: (value) => <Text>{localeCurrency(value as number, "IDR")}</Text>,
    },
    {
      key: "quantity",
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      key: "total",
      title: "Total",
      dataIndex: "total",
      render: (value) => <Text>{localeCurrency(value as number, "IDR")}</Text>,
    },
  ];

  return (
    <>
      <VStack gap={5} overflow={"auto"} minW={"800px"}>
        <Card width={"100%"}>
          <CardBody>
            <Box
              position={"absolute"}
              bottom={0}
              right={5}
              width={"200px"}
              height={"200px"}
            >
              {/* <GrContactInfo size={150} color={"#CCCCFF"} /> */}
              <Img as={"img"} src={"/images/payment.png"} objectFit={"cover"} />
            </Box>
            <HStack>
              <FaAngleDoubleLeft
                size={25}
                style={{ cursor: "pointer" }}
                onClick={backToOrderManagement}
              />
              <Text
                fontSize={"xl"}
                fontWeight={"bold"}
              >{`Order Detail - ${params.invoiceId}`}</Text>
              <OrderStatus
                status={
                  orderDetailState.data?.data.status ??
                  orderStatusConstants.done.code
                }
              />
              <Spacer />
              <OrderAction
                id={orderDetailState.data?.data.id ?? 0}
                status={
                  orderDetailState.data?.data.status ??
                  orderStatusConstants.done.code
                }
                key={1}
                refresh={() => {
                  setIsRefresh(!isRefresh);
                }}
              />
            </HStack>
            <Divider my={3} />
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Pembeli
            </Text>
            <Text fontSize={"xl"}>
              {orderDetailState.data?.data.receivedName ?? ""}
            </Text>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Alamat
            </Text>
            <Text fontSize={"xl"}>
              {orderDetailState.data?.data.address ?? ""}
            </Text>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Nomor Telepon
            </Text>
            <Text fontSize={"xl"}>
              {orderDetailState.data?.data.phone ?? ""}
            </Text>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              Tanggal Transaksi
            </Text>
            <Text fontSize={"xl"}>
              {DateTime.fromISO(
                orderDetailState.data?.data.createdAt ??
                  new Date().toISOString()
              ).toLocaleString(DateTime.DATETIME_MED)}
            </Text>
          </CardBody>
        </Card>
        <Card width={"100%"}>
          <CardBody>
            <ChakraTable columns={columns} data={data} loading={false} />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
}
