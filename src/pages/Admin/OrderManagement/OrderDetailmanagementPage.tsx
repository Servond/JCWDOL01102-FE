/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  HStack,
  Img,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { FaAngleDoubleLeft, FaRegCalendarAlt } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";
import { MdLocationPin, MdOutlinePhoneAndroid } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderDetailDashboard } from "../../../app/redux/slice/Admin/orderManagement/orderDetailSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import ChakraTable, {
  Column,
  DataType,
} from "../../../components/atoms/Table/Table";
import InfoCard from "../../../components/molecules/Admin/Order/InfoCard";
import OrderAction from "../../../components/organism/Admin/OrderAction/OrderAction";
import OrderStatus from "../../../components/organism/Admin/OrderStatus/OrderStatus";
import { orderStatusConstants } from "../../../data/order/orderStatusConstants";
import { localeCurrency } from "../../../utils/function/localeCurrency";

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
    if (orderDetailState.data?.data.order_details) {
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
        <Card width={"100%"} paddingRight={"200px"}>
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
            <Flex width={"650px"} flexWrap={"wrap"} gap={2}>
              <InfoCard
                title={"Pembeli"}
                value={orderDetailState.data?.data.receivedName ?? ""}
                icon={<IoPerson size={"50px"} color={"#718096"} />}
              />

              <InfoCard
                title={"Alamat"}
                value={orderDetailState.data?.data.address ?? ""}
                icon={<MdLocationPin size={"50px"} color={"#718096"} />}
              />

              <InfoCard
                title={"Nomor Telepon"}
                value={orderDetailState.data?.data.phone ?? ""}
                icon={<MdOutlinePhoneAndroid size={"50px"} color={"#718096"} />}
              />

              <InfoCard
                title='Tanggal Transaksi'
                value={DateTime.fromISO(
                  orderDetailState.data?.data.createdAt ??
                    new Date().toISOString()
                ).toLocaleString(DateTime.DATETIME_MED)}
                icon={<FaRegCalendarAlt size={"50px"} color={"#718096"} />}
              />
              <InfoCard
                title={"Total"}
                value={localeCurrency(
                  orderDetailState.data?.data.total ?? 0,
                  "IDR"
                )}
                icon={
                  <LiaMoneyBillWaveAltSolid size={"50px"} color={"#718096"} />
                }
              />
            </Flex>
          </CardBody>
        </Card>
        <Card width={"100%"} border={"1px solid #E2E8F0"}>
          <CardBody>
            <ChakraTable columns={columns} data={data} loading={false} />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
}
