import { Button, Img, Text, VStack } from "@chakra-ui/react";

export default function NotFoundPage() {
  return (
    <VStack as={"main"} spacing={"1rem"} h={"100%"} w={"100%"}>
      <Img
        as={"img"}
        src={"/images/not_found.svg"}
        alt={"404"}
        maxW={"400px"}
        mt={"2rem"}
      />
      <Text
        fontSize={"2xl"}
        fontWeight={"bold"}
        textAlign={"center"}
        mt={"2rem"}
      >
        Page Not Found
      </Text>
      <Text textAlign={"center"} mt={"1rem"}>
        Mohon maaf, halaman yang Anda cari tidak dapat ditemukan.
      </Text>
      <Text textAlign={"center"} mt={"1rem"}>
        Silakan kembali ke halaman utama atau periksa kembali URL yang Anda
        masukkan.
      </Text>
      <Button
        as={"a"}
        href={"/"}
        variant={"primary"}
        mt={"1rem"}
        w={"100%"}
        maxW={"400px"}
      >
        Kembali ke halaman utama
      </Button>
    </VStack>
  );
}
