/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../../../app/redux/slice/Admin/getProduct/getProductSlice";
import { AppDispatch, RootState } from "../../../../app/redux/store";
import { localeCurrency } from "../../../../utils/function/localeCurrency";
import ChakraTable, { Column, DataType } from "../../../atoms/Table/Table";
import ProductAction from "../../../molecules/Admin/Product/ProductDetail/ProductAction";
import SearchAdminProduct from "../../../molecules/Admin/Product/SearchAdminProduct";
import Paginate from "../../../molecules/Paginate";
import "./../../../../paginate-style.css";

interface IData extends DataType {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export default function ProductListManagementWeb() {
  const getAdminProductState = useSelector(
    (state: RootState) => state.getAdminProduct
  );

  const userState = useSelector((state: RootState) => state.login);

  const dispatch = useDispatch<AppDispatch>();
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState<string | number>("");
  const [pageOffset, setPageOffset] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
  const [sortBy, setSortBy] = useState("id");
  const [data, setData] = useState<IData[]>([]);
  const [orderDirection, setOrderDirection] = useState("asc");
  const handleRefresh = () => {
    setIsRefresh(!isRefresh);
  };
  useEffect(() => {
    dispatch(
      getAdminProduct({
        page: pageOffset,
        limit: 10,
        sort: "asc",
        name: productName,
        categoryId: categoryId,
        branchId: 1,
        sortBy: sortBy,
        order: orderDirection,
      })
    );
  }, [
    dispatch,
    productName,
    categoryId,
    pageOffset,
    isRefresh,
    sortBy,
    orderDirection,
    userState.token,
  ]);

  useEffect(() => {
    const payload: IData[] = [];
    getAdminProductState.data.data.forEach((item: any) => {
      payload.push({
        key: item.id.toString(),
        id: item.id as number,
        name: item.name as string,
        price: item.price as number,
        stock: item.stock as number,
        category: item.category.name,
        imageUrl: `${import.meta.env.VITE_SERVER_URL}${item.imageUrl}`,
      });
    });
    setData(payload);
  }, [getAdminProductState.data.data]);

  const handlePageChange = (selectedItem: any) => {
    setPageOffset(selectedItem.selected + 1);
  };

  const handleSearch = (value: string) => {
    setProductName(value);
  };

  const columns: Column[] = [
    {
      title: "Product name",
      dataIndex: "name",
      key: "name",
      maxWidth: "200px",
      render(text, record) {
        return (
          <HStack>
            <Box
              w={"50px"}
              h={"50px"}
              bgImage={`url(${record.imageUrl})`}
              bgSize={"cover"}
              bgPosition={"center"}
              borderRadius={"10px"}
            />
            <Text>{text}</Text>
          </HStack>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render(_text, record) {
        return <Text>{localeCurrency(record.price as number, "IDR")}</Text>;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      maxWidth: "120px",
      render(_text, record) {
        return (
          <ProductAction
            key={record.id?.toString()}
            id={record.id as number}
            refresh={handleRefresh}
            name='Action'
          />
        );
      },
    },
  ];

  return (
    <VStack height={"full"} width={"full"} overflow={"auto"} minW={"900px"}>
      {/* <TitleAdminProduct /> */}
      <HStack w={"100%"} my={"15px"}>
        <SearchAdminProduct
          handleSearch={handleSearch}
          setCategoryId={setCategoryId}
          setSortBy={setSortBy}
          setOrderDirection={setOrderDirection}
          key={"Search"}
        />
      </HStack>
      <Divider my={"5px"} />

      <Box width={"full"} height={"full"} overflowX={"auto"} overflowY={"auto"}>
        <ChakraTable columns={columns} data={data} loading={false} />
      </Box>
      <Box
        display={
          (getAdminProductState.data.totalPages ?? 0) > 1 ? "flex" : "none"
        }
      >
        <Paginate
          pageCount={getAdminProductState.data.totalPages ?? 1}
          onPageChange={handlePageChange}
          forcePage={pageOffset - 1}
        />
      </Box>
    </VStack>
  );
}
