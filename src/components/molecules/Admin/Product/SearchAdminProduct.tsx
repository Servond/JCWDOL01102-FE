import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";

interface SearchAdminProductProps {
  handleSearch: (value: string) => void;
  setCategoryId: (value: number) => void;
}

export default function SearchAdminProduct(props: SearchAdminProductProps) {
  const [search, setSearch] = useState("");
  return (
    <HStack w={"100%"} gap={"1rem"}>
      <InputGroup width={"500px"}>
        <InputLeftElement>
          <PiMagnifyingGlass />{" "}
        </InputLeftElement>
        <Input
          placeholder='Cari Nama Produk'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            onClick={() => {
              props.handleSearch(search);
              setSearch("");
            }}
          >
            Cari
          </Button>
        </InputRightElement>
      </InputGroup>
      <Spacer />
      <Select
        placeholder='Katergori'
        maxW={"200px"}
        onChange={(e) => {
          props.setCategoryId(e.target.value as unknown as number);
        }}
      >
        <option value={1}>Sayur</option>
        <option value={2}>Daging</option>
        <option value={3}>Minuman</option>
      </Select>
      <Select placeholder='Urutkan' maxW={"200px"}>
        <option value={"nameAZ"}>Nama: A-Z</option>
        <option value={"nameZA"}>Nama: Z-A</option>
        <option value={"terbaru"}>Produk Terbaru</option>
        <option value={"terlama"}>Produk Terlama</option>
        <option value={"termurah"}>Produk Termurah</option>
        <option value={"termahal"}>Produk Termahal</option>
        <option value={"terlaris"}>Produk Terlaris</option>
        <option value={"kurang-laris"}>Produk Kurang Laris</option>
        <option value={"stok-terbanyak"}>Stok Terbanyak</option>
        <option value={"stok-terendah"}>Stok Terendah</option>
      </Select>
    </HStack>
  );
}
