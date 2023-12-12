import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PiMagnifyingGlass } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { getCategory } from "../../../../app/redux/slice/Admin/category/AdminCategorySlice";
import { AppDispatch, RootState } from "../../../../app/redux/store";

interface SearchAdminProductProps {
  handleSearch: (value: string) => void;
  setCategoryId: (value: number) => void;
  setSortBy: (value: string) => void;
  setOrderDirection: (value: string) => void;
}

export default function SearchAdminProduct(props: SearchAdminProductProps) {
  const categoryState = useSelector((state: RootState) => state.adminCategory);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  const [search, setSearch] = useState("");

  const handleOrderBy = (value: string) => {
    switch (value) {
      case "nameAZ":
        props.setSortBy("name");
        props.setOrderDirection("asc");
        break;
      case "nameZA":
        props.setSortBy("name");
        props.setOrderDirection("desc");
        break;
      case "terbaru":
        props.setSortBy("id");
        props.setOrderDirection("desc");
        break;
      case "terlama":
        props.setSortBy("id");
        props.setOrderDirection("asc");
        break;
      case "termurah":
        props.setSortBy("price");
        props.setOrderDirection("asc");
        break;
      case "termahal":
        props.setSortBy("price");
        props.setOrderDirection("desc");
        break;
      case "stok-terbanyak":
        props.setSortBy("stock");
        props.setOrderDirection("desc");
        break;
      case "stok-terendah":
        props.setSortBy("stock");
        props.setOrderDirection("asc");
        break;
      default:
        break;
    }
  };

  const [productNameSearch] = useDebounce(search, 1000);
  useEffect(() => {
    props.handleSearch(productNameSearch);
  }, [productNameSearch, props]);

  return (
    <HStack w={"100%"} gap={"1rem"}>
      <InputGroup width={"500px"}>
        <InputLeftElement>
          <PiMagnifyingGlass key={"PiMagnifyingGlass"} />{" "}
        </InputLeftElement>
        <Input
          placeholder='Cari Nama Produk'
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </InputGroup>
      <Spacer />
      <Select
        placeholder='Katergori'
        maxW={"200px"}
        onChange={(e) => {
          props.setCategoryId(e.target.value as unknown as number);
        }}
      >
        {categoryState.data.map((item) => {
          return <option value={item.id}>{item.name}</option>;
        })}
      </Select>
      <Select
        placeholder='Urutkan'
        maxW={"200px"}
        onChange={(e) => {
          handleOrderBy(e.target.value as unknown as string);
        }}
      >
        <option value={"nameAZ"}>Nama: A-Z</option>
        <option value={"nameZA"}>Nama: Z-A</option>
        <option value={"terbaru"}>Produk Terbaru</option>
        <option value={"terlama"}>Produk Terlama</option>
        <option value={"termurah"}>Produk Termurah</option>
        <option value={"termahal"}>Produk Termahal</option>
        <option value={"stok-terbanyak"}>Stok Terbanyak</option>
        <option value={"stok-terendah"}>Stok Terendah</option>
      </Select>
    </HStack>
  );
}
