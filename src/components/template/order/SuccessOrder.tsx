import {
  Box,
  Flex,
  Img,
  Spacer,
  Text,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";

interface SuccessOrderProps {
  showSuccessPage: boolean;
}

export default function SuccessOrder(props: SuccessOrderProps) {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      width={isMobile ? "100vw" : "500px"}
      backgroundColor={"white"}
      minH={"100vh"}
      maxH={"100vh"}
      position={"fixed"}
      top={"0"}
      display={props.showSuccessPage ? "block" : "none"}
      left={isMobile ? "0" : "calc(50% - 250px)"}
      padding={"25px"}
      paddingY={"0px"}
    >
      <VStack
        gap={"10px"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        h={"100vh"}
        paddingBottom={"50px"}
      >
        <Img
          as='img'
          crossOrigin='anonymous'
          src='success-order.jpg'
          alt='Success Order'
          width={"300px"}
          height={"auto"}
          objectFit={"contain"}
          border='0'
        />
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Pesanan Berhasil Dibuat
        </Text>
        <Text fontSize={"md"} fontWeight={"normal"}>
          Terima kasih telah berbelanja di reFresh Store
        </Text>
        {/* <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={"10px"}
          border={"1px solid #E2E2E2"}
          borderRadius={"10px"}
          cursor={"pointer"}
          bgColor={"white"}
          color={"gray.800"}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <Text fontSize={"md"} fontWeight={"bold"}>
            Kembali ke Halaman Utama
          </Text>
        </Box> */}

        {/* create 2 button for back to homepage and check order detail */}
        <Spacer />
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
          flexDir={"column"}
          gap={"10px"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"10px"}
            border={"1px solid #E2E2E2"}
            borderRadius={"10px"}
            cursor={"pointer"}
            bgColor={"white"}
            color={"gray.800"}
            onClick={() => {
              window.location.href = "/order";
            }}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              Lihat Detail Pesanan
            </Text>
          </Box>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"10px"}
            border={"1px solid #E2E2E2"}
            borderRadius={"10px"}
            cursor={"pointer"}
            bgColor={"white"}
            color={"gray.800"}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <Text fontSize={"md"} fontWeight={"bold"}>
              Kembali ke Halaman Utama
            </Text>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
}
