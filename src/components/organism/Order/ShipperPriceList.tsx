/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  Box,
  Center,
  HStack,
  Img,
  Spacer,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaBox, FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJnePrice,
  fetchPosPrice,
  fetchTikiPrice,
} from "../../../app/redux/slice/Order/ShippingPriceSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import LoadingCenter from "../../molecules/Loading";
import Shipper from "../../molecules/Order/Shipper";
import { setIsOpenDrawer } from "../../../app/redux/slice/Order/OrderSlice";
import jnelogo from "../../../assets/logo/jne.png";
import tikilogo from "../../../assets/logo/tiki.png";
import poslogo from "../../../assets/logo/pos.png";
interface ShipperPriceListProps {
  showShipper: boolean;
  origin?: string;
  destination?: string;
  originName?: string;
}

export default function ShipperPriceList(props: ShipperPriceListProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isOpenJne, setIsOpenJne] = useState(false);
  const [isOpenTiki, setIsOpenTiki] = useState(false);
  const [isOpenPos, setIsOpenPos] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const courierPriceState = useSelector(
    (state: RootState) => state.courierPrice
  );
  const orderState = useSelector((state: RootState) => state.order);

  useEffect(() => {
    if (
      !props.origin ||
      !props.destination ||
      props.origin === "null" ||
      props.destination === "null"
    ) {
      return;
    }
    const data = {
      origin: props.origin ?? "152",
      destination: props.destination ?? "23",
      weight: 400,
      courier: "jne",
    };
    dispatch(fetchJnePrice(data));
    // dispatch(fetchTikiPrice(data));
    // dispatch(fetchPosPrice(data));
  }, [dispatch, props.origin, props.destination]);

  const getTotalWeight = () => {
    let totalWeight = 0;
    orderState.cart.forEach((item: any) => {
      const product = orderState.products.find(
        (product) => product.id === item.id
      );
      totalWeight += product?.weight! * item.qty;
    });
    return totalWeight / 1000;
  };

  return (
    <Box
      position={"fixed"}
      bottom={props.showShipper ? "0" : "-100%"}
      left={isMobile ? "0" : "calc(50% - 250px)"}
      width={isMobile ? "100vw" : "500px"}
      backgroundColor={"white"}
      border={"1px solid #E2E2E2"}
      minH={"100px"}
      padding={"20px"}
      borderRadius={"20px 20px 0 0"}
      transition={"all 0.4s ease-in-out"}
      display={"flex"}
      flexDir={"column"}
      gap={"10px"}
    >
      <HStack alignItems={"center"}>
        <RxCross1
          size={"17px"}
          onClick={() => dispatch(setIsOpenDrawer(false))}
          style={{ cursor: "pointer" }}
        />
        <Text fontSize={"larger"} fontWeight={"bold"}>
          Metode Pengiriman
        </Text>
      </HStack>
      <Box border={"1px solid #E2E2E2"} borderRadius={"10px"} padding={"10px"}>
        <HStack>
          <FaBox />
          <Text fontSize={"small"}>
            {`Dikirim dari ${props.originName}- Berat ${getTotalWeight()} Kg`}
          </Text>
        </HStack>
      </Box>
      <Box border={"1px solid #E2E2E2"} borderRadius={"10px"} padding={"10px"}>
        <Stack
          direction={"row"}
          spacing={"10px"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={() => {
            setIsOpenJne(!isOpenJne);
            setIsOpenTiki(false);
            setIsOpenPos(false);
          }}
        >
          <Img as='img' crossOrigin='anonymous' src={jnelogo} width={"50px"} />
          <Text fontSize={"medium"}>Jalur Nugraha Ekakurir (JNE)</Text>
          <Spacer />
          {isOpenJne ? <FaChevronUp /> : <FaChevronDown />}
        </Stack>
        {courierPriceState.jneData.length === 0 && (
          <Center>Data Tidak Tersedia</Center>
        )}
        {courierPriceState.statusJne !== "done" &&
        courierPriceState.jneData.length > 0 ? (
          <LoadingCenter />
        ) : (
          courierPriceState.statusJne === "done" &&
          courierPriceState.jneData.length > 0 &&
          courierPriceState.jneData.map((data) => (
            <>
              <Shipper
                key={data.service ?? ""}
                shipper={"JNE"}
                isOpen={isOpenJne}
                code={data.service}
                name={data.description ?? ""}
                price={data.cost[0].value ?? 0}
                duration={data.cost[0].etd ?? ""}
              />
            </>
          ))
        )}
      </Box>
      {/* <Box border={"1px solid #E2E2E2"} borderRadius={"10px"} padding={"10px"}>
        <Stack
          direction={"row"}
          spacing={"10px"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={() => {
            setIsOpenTiki(!isOpenTiki);
            setIsOpenJne(false);
            setIsOpenPos(false);
          }}
        >
          <Img as='img' crossOrigin='anonymous' src={tikilogo} width={"50px"} />
          <Text fontSize={"medium"}>Citra Van Titipan Kilat (TIKI)</Text>
          <Spacer />
          {isOpenTiki ? <FaChevronUp /> : <FaChevronDown />}
        </Stack>
        {courierPriceState.statusTiki !== "done" ? (
          <LoadingCenter />
        ) : (
          courierPriceState.statusTiki === "done" &&
          courierPriceState.tikiData.map((data) => (
            <Shipper
              key={data.service ?? ""}
              shipper='TIKI'
              isOpen={isOpenTiki}
              code={data.service ?? ""}
              name={data.description ?? ""}
              price={data.cost[0].value ?? 0}
              duration={data.cost[0].etd ?? ""}
            />
          ))
        )}
      </Box>
      <Box border={"1px solid #E2E2E2"} borderRadius={"10px"} padding={"10px"}>
        <Stack
          direction={"row"}
          spacing={"10px"}
          alignItems={"center"}
          cursor={"pointer"}
          onClick={() => {
            setIsOpenPos(!isOpenPos);
            setIsOpenJne(false);
            setIsOpenTiki(false);
          }}
        >
          <Img as='img' crossOrigin='anonymous' src={poslogo} width={"50px"} />
          <Text fontSize={"medium"}>POS Indonesia</Text>
          <Spacer />
          {isOpenPos ? <FaChevronUp /> : <FaChevronDown />}
        </Stack>
        {courierPriceState.statusPos !== "done" ? (
          <LoadingCenter />
        ) : (
          courierPriceState.statusPos === "done" &&
          courierPriceState.posData.map((data) => (
            <Shipper
              key={data.service ?? ""}
              shipper='POS'
              isOpen={isOpenPos}
              code={data.service ?? ""}
              name={data.description ?? ""}
              price={data.cost[0].value ?? 0}
              duration={data.cost[0].etd.replace("HARI", "") ?? ""}
            />
          ))
        )}
      </Box> */}
    </Box>
  );
}
