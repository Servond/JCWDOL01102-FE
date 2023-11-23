import { Button, Text, VStack } from "@chakra-ui/react";

export default function FailedLoadContent() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <VStack justifyContent={"center"} alignItems={"center"} my={"15px"}>
      <Text>Gagal memuat data</Text>
      <Button variant={"primary"} onClick={handleReload}>
        Muat ulang
      </Button>
    </VStack>
  );
}
