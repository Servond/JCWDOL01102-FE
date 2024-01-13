/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Img,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { PiMapPinFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import TitleHeader from "../../components/molecules/MyDetails/TitleHeader";
import OrderItem from "../../components/organism/Order/OrderItem";
import ShipperPriceList from "../../components/organism/Order/ShipperPriceList";
import PaymentMethod from "../../components/template/order/PaymentMethod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import {
  fetchOrderProduct,
  setCart,
  setCutPrice,
  setDataOrder,
  setIsOpenDrawer,
  setProductAmount,
  setPromotion,
  setTotalAmount,
} from "../../app/redux/slice/Order/OrderSlice";
import { localeCurrency } from "../../utils/function/localeCurrency";
import LoadingCenter from "../../components/molecules/Loading";
import { fetchProductCart } from "../../app/redux/slice/cart/getProductCart";
import { ICart, IPromotion } from "../../data/order/interface";

export default function OrderPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/cart");
  };
  const handleChangeAddress = () => {
    navigate("/my-address?back=order");
  };

  const [showPayment, setShowPayment] = useState(false);
  const orderState = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orderState.statusFetchProduct === "pending") return;
    const productid = orderState.cart.map((item) => item.id).join(",");
    dispatch(fetchOrderProduct(productid));
  }, [dispatch, orderState.cart]);

  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.login.user);
  const carts = useSelector((state: RootState) => state.getCart.cart);
  const branchId = useSelector(
    (state: RootState) => state.nearestBranch.branch.id
  );
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    dispatch(
      fetchProductCart({
        branchId: branchId
          ? branchId
          : JSON.parse(localStorage.getItem("branch")!).id,
        userId: user?.userId,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (carts.length === 0) return;
    const payload: ICart[] = carts.map((item) => {
      return {
        id: item.productId,
        qty: item.qty,
        name: item.product.name,
        price: item.product.price,
      };
    });
    let cutPrice = 0;

    const promotions: IPromotion[] = [];
    carts.map((item) => {
      if (item.product.promotion.length !== 0)
        return item.product.promotion.map((promo) => {
          if (promo.type === "price_cut" && promo.valueType === "percentage") {
            cutPrice += item.product.price * item.qty * (promo.value! / 100);
          } else if (
            promo.type === "price_cut" &&
            promo.valueType === "fixed_price"
          ) {
            cutPrice += item.qty * promo.value!;
          }
          promotions.push({
            productId: item.productId,
            id: promo.id,
            name: promo.name,
            type: promo.type as any,
            value: promo.value as number,
            valueType: promo.valueType as any,
          });
        });
    });
    dispatch(setCutPrice(cutPrice));
    dispatch(setCart(payload));
    dispatch(setPromotion(promotions));
    dispatch(setDataOrder({ promotions: promotions }));
  }, [carts, dispatch]);

  // const getTotalAmount = () => {
  //   let totalAmount = 0;
  //   orderState.cart.forEach((item) => {
  //     const product = orderState.products.find(
  //       (product) => product.id === item.id
  //     );
  //     totalAmount += product?.price! * item.qty;
  //   });
  //   return totalAmount;
  // };

  useEffect(() => {
    dispatch(
      setDataOrder({
        products: orderState.cart.map((item) => {
          const product = orderState.products.find(
            (product) => product.id === item.id
          );
          return {
            id: item.id,
            name: product?.name ?? "",
            price: product?.price ?? 0,
            qty: item.qty,
          };
        }),
      })
    );
    const totalProductPrice = orderState.cart.reduce(
      (total, item) =>
        total +
        (orderState.products.find((product) => product.id === item.id)?.price ??
          0) *
          item.qty,
      0
    );
    dispatch(setProductAmount(totalProductPrice));
    dispatch(
      setTotalAmount(
        totalProductPrice + orderState.shippingAmount - orderState.cutPrice
      )
    );
  }, [
    orderState.products,
    dispatch,
    orderState.cart,
    orderState.shippingAmount,
    orderState.cutPrice,
  ]);

  return (
    <>
      <VStack gap={"10px"} paddingBottom={"30px"}>
        <TitleHeader title='Pengiriman' callback={handleBack} />
        <Divider />
        <Card
          cursor={"pointer"}
          onClick={handleChangeAddress}
          _hover={{ boxShadow: "0px 0px 5px 1px #53B175" }}
          width={"100%"}
        >
          <CardBody padding={"15px"}>
            <HStack>
              <VStack width={"90%"} alignItems={"flex-start"}>
                <Text fontSize={"medium"}>Alamat pengiriman kamu</Text>
                <Box width={"100%"}>
                  <HStack>
                    <PiMapPinFill color='#53B175' />
                    <Text
                      fontSize={"medium"}
                      fontWeight={"bold"}
                      display={"inline"}
                    >
                      Alamat Rumah - Galih Setyawan
                    </Text>
                  </HStack>
                  <Text
                    fontSize={"medium"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                  >
                    jl. kencana putri kusuma wijaya rano karno, kecamatan
                    panjang sekali ini ceritanya
                  </Text>
                </Box>
              </VStack>
              <FaChevronRight />
            </HStack>
          </CardBody>
        </Card>
        <Card width={"100%"}>
          <CardBody
            padding={"10px"}
            gap={"5px"}
            display={"flex"}
            flexDir={"column"}
          >
            <Text fontSize={"medium"} fontWeight={"bold"} my={"5px"}>
              Nama Toko
            </Text>
            {orderState.statusFetchProduct === "pending" ? (
              <LoadingCenter />
            ) : orderState.statusFetchProduct === "done" ? (
              orderState.products.map((item) => {
                const productFromCart = orderState.cart.find(
                  (cart) => cart.id === item.id
                );
                return (
                  <OrderItem
                    key={item.id}
                    name={item.name}
                    imgUrl={`${import.meta.env.VITE_SERVER_URL}${
                      item.imageUrl
                    }`}
                    price={item.price}
                    quantity={productFromCart?.qty ?? 0}
                  />
                );
              })
            ) : (
              <Text fontSize={"medium"} fontWeight={"bold"} my={"5px"}>
                Tidak ada produk
              </Text>
            )}
            <Box
              width={"100%"}
              border={"1px solid #E2E2E2"}
              borderRadius={"10px"}
              padding={"10px"}
              cursor={"pointer"}
              my={"10px"}
            >
              {orderState.courier === null ? (
                <HStack onClick={() => dispatch(setIsOpenDrawer(true))}>
                  <Text fontSize={"medium"} fontWeight={"bold"} my={"5px"}>
                    Pilih Pengiriman
                  </Text>
                  <Spacer />
                  <FaChevronRight />
                </HStack>
              ) : (
                <Stack
                  direction={"row"}
                  gap={"5px"}
                  onClick={() => dispatch(setIsOpenDrawer(true))}
                  width={"100%"}
                >
                  <Img
                    as='img'
                    src={orderState.courier.image}
                    maxH={"40px"}
                    maxW={"70px"}
                    crossOrigin='anonymous'
                    objectFit={"contain"}
                  />
                  <VStack
                    width={"100%"}
                    alignItems={"flex-start"}
                    gap={0}
                    ml={"15px"}
                  >
                    <HStack>
                      <Text fontSize={"small"} fontWeight={"bold"}>
                        {`${orderState.courier.name} - ${orderState.courier.code}`}
                      </Text>
                      <Spacer />
                      <Text fontSize={"small"} fontWeight={"bold"}>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          maximumFractionDigits: 0,
                        }).format(orderState.courier.price)}
                      </Text>
                    </HStack>
                    <Text fontSize={"small"} color={"gray.600"}>
                      {`Estimasi ${orderState.courier.etd} hari`}
                    </Text>
                  </VStack>
                </Stack>
              )}
            </Box>
          </CardBody>
        </Card>
        <Card width={"100%"} cursor={"pointer"}>
          <CardBody padding={"10px"}>
            <HStack justifyContent={"space-between"}>
              <Text fontSize={"medium"} fontWeight={"bold"} my={"5px"}>
                Promo yang tersedia
              </Text>
              <FaChevronRight />
            </HStack>
          </CardBody>
        </Card>
        <VStack width={"100%"} gap={0}>
          <Text
            fontSize={"smaller"}
            fontWeight={"bold"}
            my={"5px"}
            textAlign={"left"}
            width={"100%"}
          >
            Cek Ringkasan Belanja
          </Text>
          <HStack justifyContent={"space-between"} width={"100%"} my={0}>
            <Text fontSize={"smaller"}>Total Harga</Text>
            <Text fontSize={"smaller"}>
              {localeCurrency(orderState.productAmount, "IDR")}
            </Text>
          </HStack>
          <HStack justifyContent={"space-between"} width={"100%"} my={0}>
            <Text fontSize={"smaller"}>Total Ongkos Kirim</Text>
            <Text fontSize={"smaller"}>
              {localeCurrency(orderState.shippingAmount, "IDR")}
            </Text>
          </HStack>
          <HStack justifyContent={"space-between"} width={"100%"} my={0}>
            <Text fontSize={"smaller"}>Potongan</Text>
            <Text fontSize={"smaller"} color={"red.500"}>
              {localeCurrency(-orderState.cutPrice, "IDR")}
            </Text>
          </HStack>
          <Divider my={"10px"} />
          <HStack justifyContent={"space-between"} width={"100%"} my={0}>
            <Text fontSize={"smaller"}>Total Belanja</Text>
            <Text fontSize={"smaller"}>
              {localeCurrency(orderState.totalAmount, "IDR")}
            </Text>
          </HStack>
          <Divider my={"10px"} />
          <Button
            isDisabled={orderState.courier === null}
            _disabled={{
              bgColor: "gray.300",
              color: "white",
              cursor: "not-allowed",
              _hover: {
                bgColor: "gray.300",
                color: "white",
                cursor: "not-allowed",
              },
            }}
            width={"100%"}
            colorScheme={"green"}
            onClick={() => setShowPayment(true)}
          >
            Pilih Pembayaran
          </Button>
        </VStack>
      </VStack>
      <ShipperPriceList showShipper={orderState.isOpenDrawer} />
      <PaymentMethod
        showPayment={showPayment}
        setShowPayment={setShowPayment}
      />
    </>
  );
}
