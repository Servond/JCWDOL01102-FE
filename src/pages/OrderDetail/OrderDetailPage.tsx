import {
  Box,
  Card,
  CardBody,
  Divider,
  HStack,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaRegCheckCircle } from "react-icons/fa";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";

import { DateTime } from "luxon";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { TiShoppingCart } from "react-icons/ti";
import OrderItem from "../../components/organism/Order/OrderItem";
import { orderStatus } from "../../data/order/orderStatusConstants";

export default function OrderDetailPage() {
  const [isShow, setIsShow] = React.useState(false);
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  return (
    <>
      <VStack gap={"10px"}>
        <TitleHeader title={"Detail Order"} />
        <Divider />

        <Card width={"100%"}>
          <CardBody>
            <VStack
              justifyContent={"start"}
              alignItems={"flex-start"}
              position={"relative"}
              gap={"10px"}
            >
              <Box>
                <Text fontSize={"small"}>Nomor Pesanan</Text>
                <Text fontWeight={"bold"}>1234567890</Text>
              </Box>
              <Box zIndex={"5"}>
                <Text fontSize={"small"}>Alamat Tujuan</Text>
                <Text fontWeight={"bold"}>
                  Jl. Raya Bogor KM 30, Depok, Jawa Barat, Indonesia
                </Text>
              </Box>
              <Box>
                <Text fontSize={"small"}>Tanggal Transaksi</Text>
                <Text fontWeight={"bold"}>
                  {DateTime.fromSQL("2023-12-19 20:58:10").toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </Text>
              </Box>
              <Text
                color={"blue.500"}
                cursor={"pointer"}
                onClick={() => setIsShow(true)}
              >
                Lihat Status Pesanan
              </Text>

              <Box position={"absolute"} top={"-25px"} right={"-25px"}>
                <TiShoppingCart size={"100px"} color={"#FAF089"} />
              </Box>
            </VStack>
          </CardBody>
        </Card>
        <Card width={"100%"}>
          <CardBody>
            <VStack
              justifyContent={"start"}
              alignItems={"flex-start"}
              position={"relative"}
              gap={"10px"}
            >
              <Text fontWeight={"bold"}>Detail Pesanan</Text>
              <OrderItem
                key={1}
                name={"Lontong Tahu"}
                // 75px randome image
                imgUrl={"https://picsum.photos/75"}
                price={10000}
                quantity={3}
              />
              <OrderItem
                key={1}
                name={"Lontong Tahu"}
                // 75px randome image
                imgUrl={"https://picsum.photos/75"}
                price={10000}
                quantity={3}
              />
              <OrderItem
                key={1}
                name={"Lontong Tahu"}
                // 75px randome image
                imgUrl={"https://picsum.photos/75"}
                price={10000}
                quantity={3}
              />
            </VStack>
          </CardBody>
        </Card>
      </VStack>
      <Box
        height={"100vh"}
        position={"fixed"}
        top={"0"}
        left={"0"}
        width={"100vw"}
        bgColor={"rgba(0,0,0,0.5)"}
        zIndex={"90"}
        display={isShow ? "flex" : "none"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => setIsShow(false)}
      >
        <Box
          display={"flex"}
          flexDir={"column"}
          position={"absolute"}
          bottom={isShow ? "0" : "-100%"}
          left={isMobile ? "0" : "calc(50% - 250px)"}
          width={isMobile ? "100%" : "500px"}
          height={"fit-content"}
          border={"1px solid #E2E8F0"}
          padding={"20px"}
          bgColor={"white"}
          borderRadius={"10px 10px 0 0"}
          borderBottom={"none"}
          zIndex={"100"}
          onClick={(e) => e.stopPropagation()}
          transition={"all 0.5s ease"}
        >
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
            marginBottom={"20px"}
          >
            <Text
              fontSize={"medium"}
              fontWeight={"bold"}
              color={"#4A5568"}
              marginBottom={"10px"}
            >
              Status Pesanan
            </Text>
            <RxCross1
              color={"#38A169"}
              onClick={() => setIsShow(false)}
              style={{ cursor: "pointer" }}
            />
          </HStack>
          <List display={"flex"} flexDir={"column"} gap={"20px"}>
            {orderStatus.map((status, index) => (
              <ListItem key={index}>
                <ListIcon
                  as={FaRegCheckCircle}
                  color={"green.500"}
                  marginRight={"10px"}
                />
                {status.description}
              </ListItem>
            ))}
            {/* <ListItem>
              <ListIcon as={FaRegCheckCircle} color='green.500' />
              Transaksi dibuat
            </ListItem>
            <ListItem>
              <ListIcon as={FaRegCheckCircle} color='green.500' />
              Pembayaran Berhasil
            </ListItem>
            <ListItem>
              <ListIcon as={FaRegDotCircle} color='green.500' />
              Pesanan diproses
            </ListItem>
            <ListItem>
              <ListIcon as={FaRegCircle} color='green.500' />
              Pesanan dikemas
            </ListItem>
            <ListItem>
              <ListIcon as={FaRegCircle} color='green.500' />
              Pesanan dikirim
            </ListItem>
            <ListItem>
              <ListIcon as={FaRegCircle} color='green.500' />
              Pesanan diterima
            </ListItem> */}
          </List>
        </Box>
      </Box>
    </>
  );
}
