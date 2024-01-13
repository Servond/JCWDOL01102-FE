/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Divider,
  HStack,
  Radio,
  VStack,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, getPaymentMethods } from "../../../api/order";
import {
  setDataOrder,
  setPaymentCode,
} from "../../../app/redux/slice/Order/OrderSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { IPaymentGateway } from "../../../data/order.interface";
import TitleHeader from "../../molecules/MyDetails/TitleHeader";
import SuccessOrder from "./SuccessOrder";
import { clearCartAll } from "../../../api/cart";
interface PaymentMethodProps {
  showPayment: boolean;
  setShowPayment: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function PaymentMethod(props: PaymentMethodProps) {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  const [paymentMetods, setPaymentMethods] = useState<IPaymentGateway[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    number | null
  >(null);
  const [detailOrderUrl, setDetailOrderUrl] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const orderState = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const handlePaymentMethod = async () => {
    try {
      const response = await getPaymentMethods();
      const data = response.data.data;
      setPaymentMethods(data);
    } catch (error: any) {
      toast({
        title: "Gagal mendapatkan metode pembayaran",
        description: error?.response?.data?.message ?? "Terjadi kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleChangePaymentMethod = (code: string) => {
    dispatch(setPaymentCode(code));
    dispatch(setDataOrder({ paymentCode: code }));
  };

  useEffect(() => {
    handlePaymentMethod();
  }, []);
  // const navigate = useNavigate();
  const handleCreatePayment = async () => {
    try {
      console.log(orderState.dataOrder);
      const response = await createTransaction(orderState.dataOrder!);
      // const redirectUrl =
      //   response.data.data.virtual_account_info.how_to_pay_page;
      setRedirectUrl(response.data.data.virtual_account_info.how_to_pay_page);
      setDetailOrderUrl(`/order/${response.data.data.order.invoice_number}`);
      toast({
        title: "Berhasil membuat pesanan",
        description: response.data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsSuccess(true);
      await clearCartAll();
      // window.open(redirectUrl, "_blank", "noopener,noreferrer");
      // navigate(`/order/${response.data.data.order.invoice_number}`);
    } catch (error: any) {
      toast({
        title: "Gagal membuat pesanan",
        description: error?.response?.data?.message ?? "Terjadi kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <>
      <Box
        width={isMobile ? "100vw" : "500px"}
        backgroundColor={"white"}
        minH={"100vh"}
        maxH={"100vh"}
        position={"fixed"}
        top={"0"}
        display={props.showPayment ? "block" : "none"}
        left={isMobile ? "0" : "calc(50% - 250px)"}
        padding={"25px"}
        paddingY={"0px"}
      >
        <VStack gap={"10px"}>
          <TitleHeader
            title='Metode Pembayaran'
            callback={() => props.setShowPayment(false)}
          />
          <Divider />

          {paymentMetods.map((paymentMethod) => (
            <HStack
              key={paymentMethod.id}
              width={"100%"}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={"10px"}
              border={"1px solid #E2E2E2"}
              borderRadius={"10px"}
              cursor={"pointer"}
              onClick={() => {
                setSelectedPaymentMethod(paymentMethod.id);
                handleChangePaymentMethod(paymentMethod.code);
              }}
              bgColor={
                selectedPaymentMethod === paymentMethod.id
                  ? "gray.300"
                  : "white"
              }
              color={"gray.800"}
            >
              <HStack gap={"10px"}>
                <img
                  src={paymentMethod.logoUrl}
                  alt={paymentMethod.name}
                  crossOrigin='anonymous'
                  width={"80px"}
                  // height={"5px"}
                />
                <VStack alignItems={"flex-start"}>
                  <Box>
                    <strong>{paymentMethod.name}</strong>
                  </Box>
                </VStack>
              </HStack>
              <Radio
                value={paymentMethod.id.toString()}
                bgColor={"transparent"}
                _hover={{ bgColor: "transparent" }}
                border={"none"}
                _selected={{ bgColor: "transparent", border: "none" }}
              />
            </HStack>
          ))}
          <Divider />
          <Button
            marginX={"auto"}
            width={"100%"}
            isDisabled={selectedPaymentMethod === null}
            _disabled={{
              bgColor: "gray.400",
              color: "white",
              cursor: "not-allowed",
              _hover: {
                bgColor: "gray.400",
                color: "white",
              },
            }}
            onClick={handleCreatePayment}
          >
            Buat Pesanan
          </Button>
        </VStack>
      </Box>
      <SuccessOrder
        detailOrderUrl={detailOrderUrl}
        redirectUrl={redirectUrl}
        showSuccessPage={isSuccess}
      />
    </>
  );
}
