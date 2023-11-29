/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Text,
  VStack,
} from "@chakra-ui/react";
import TitleAdminProduct from "../../../molecules/Admin/Product/TitleAdminProduct";
import SearchAdminProduct from "../../../molecules/Admin/Product/SearchAdminProduct";
import HeaderAdminProduct from "../../../molecules/Admin/Product/HeaderAdminProduct";
import AdminProductItem from "../../../molecules/Admin/Product/AdminProduct";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/redux/store";
import { useEffect, useState } from "react";
import { getAdminProduct } from "../../../../app/redux/slice/Admin/getProduct/getProductSlice";
import { AiOutlineInbox } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import "./style.css";

export default function ProductListManagementWeb() {
  const getAdminProductState = useSelector(
    (state: RootState) => state.getAdminProduct
  );
  const dispatch = useDispatch<AppDispatch>();
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState<string | number>("");
  const [pageOffset, setPageOffset] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);
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
      })
    );
  }, [dispatch, productName, categoryId, pageOffset, isRefresh]);

  const handlePageChange = (selectedItem: any) => {
    setPageOffset(selectedItem.selected + 1);
  };

  const handleSearch = (value: string) => {
    setProductName(value);
  };

  return (
    <Box w={"100vw"} minH={"100vh"} overflowY={"scroll"} overflowX={"scroll"}>
      <VStack
        w={{ base: "100%", lg: "90%" }}
        m={{ base: "0 auto", lg: "auto" }}
        padding={"15px"}
        minW={"800px"}
      >
        <TitleAdminProduct />
        <VStack
          w={"100%"}
          bgColor={"white"}
          minH={"100px"}
          borderRadius={"10px"}
          p={"15px"}
        >
          <SearchAdminProduct
            handleSearch={handleSearch}
            setCategoryId={setCategoryId}
          />
          <Divider my={"5px"} />
          <Grid
            templateColumns={"repeat(14, 1fr)"}
            gap={"1rem"}
            rowGap={"5px"}
            // justifyContent={"space-around"}
            w={"100%"}
          >
            <HeaderAdminProduct />
            <GridItem colSpan={14}>
              <Divider my={"0px"} />
            </GridItem>
            {getAdminProductState.data.data.length === 0 && (
              <GridItem colSpan={14}>
                <Box width={"100%"} mt={"25px"}>
                  <Center>
                    <VStack>
                      <AiOutlineInbox size={"50px"} color={"#718096"} />
                      <Text color={"gray.500"}>Product Not Found</Text>
                    </VStack>
                  </Center>
                </Box>
              </GridItem>
            )}

            {getAdminProductState.data?.data.map((item: any) => (
              <AdminProductItem
                imageUrl={item.imageUrl}
                id={item.id}
                name={item.name}
                price={item.price}
                stock={item.stock}
                refresh={handleRefresh}
              />
            ))}
          </Grid>
          <div id='container'>
            {getAdminProductState.data.data.length !== 0 && (
              <ReactPaginate
                previousLabel='Previous'
                nextLabel='Next'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLabel='...'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                pageCount={getAdminProductState.data.totalPages ?? 1}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName='pagination'
                activeClassName='active'
                // forcePage={pageOffset}
              />
            )}
          </div>
        </VStack>
      </VStack>
    </Box>
  );
}
