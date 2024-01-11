import { Center, GridItem, Text } from "@chakra-ui/react";

export default function HeaderAdminProduct() {
  return (
    <>
      <GridItem colSpan={5}>
        <Text fontWeight={"bold"}>Nama Produk</Text>
      </GridItem>
      <GridItem colSpan={3}>
        <Text fontWeight={"bold"}>Harga</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text fontWeight={"bold"}>Stok</Text>
      </GridItem>
      <GridItem colSpan={2}>
        <Text fontWeight={"bold"}>Kategori</Text>
      </GridItem>

      <GridItem colSpan={2}>
        <Center>
          <Text fontWeight={"bold"}>Aksi</Text>
        </Center>
      </GridItem>
    </>
  );
}
