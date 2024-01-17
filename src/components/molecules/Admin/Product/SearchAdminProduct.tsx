import {
  Button,
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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/dashboard/add-product");
  };
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
        placeholder='Category'
        maxW={"200px"}
        onChange={(e) => {
          props.setCategoryId(e.target.value as unknown as number);
        }}
      >
        {categoryState.data.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </Select>
      <Select
        placeholder='Filter'
        maxW={"200px"}
        onChange={(e) => {
          handleOrderBy(e.target.value as unknown as string);
        }}
      >
        <option value={"nameAZ"}>Name: A-Z</option>
        <option value={"nameZA"}>Name: Z-A</option>
        <option value={"terbaru"}>Newest Product</option>
        <option value={"terlama"}>Oldest Product</option>
        <option value={"termurah"}>Cheapest Product</option>
        <option value={"termahal"}>Most Expensive Product</option>
        <option value={"stok-terbanyak"}>Most Stock</option>
        <option value={"stok-terendah"}>Least Stock</option>
      </Select>
      <Button onClick={handleAddProduct} variant={"outline"}>
        Add Product
      </Button>
    </HStack>
  );
}
