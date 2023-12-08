/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider, HStack, Input, Select, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAdminProduct } from "../../../../app/redux/slice/Admin/getProduct/getProductSlice";
import { AppDispatch, RootState } from "../../../../app/redux/store";
import Wrapper from "../../../atoms/Wrapper";
import TitleHeader from "../../../molecules/MyDetails/TitleHeader";
import CardProductMobile from "../../../organism/Admin/Produk/CardProductMobile";

export default function ProductListManagementMobile() {
  const navigate = useNavigate();
  const callbackBack = () => {
    navigate("/dashboard/products");
  };

  const callbackAdd = () => {
    navigate("/dashboard/add-product");
  };

  const getAdminProductState = useSelector(
    (state: RootState) => state.getAdminProduct
  );
  const categoryState = useSelector((state: RootState) => state.adminCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState<string | number>("");
  const [pageOffset, setPageOffset] = useState(1);
  const [isRefresh, setIsRefresh] = useState(false);

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
  return (
    <Wrapper>
      <VStack key={"ProductListManagementMobile"} mb={"30px"}>
        <TitleHeader
          title={"Daftar Produk"}
          href='/dashboard/products'
          subMenu='Tambah Produk'
          callback={callbackBack}
          callbackSubmenu={callbackAdd}
          isNotBack={true}
        />
        <Divider />
        <HStack>
          <Input
            placeholder='Cari Produk'
            onChange={(e) => setProductName(e.target.value)}
          />

          <Select
            placeholder='Katergori'
            maxW={"200px"}
            onChange={(e) => {
              setCategoryId(e.target.value as unknown as number);
            }}
          >
            {categoryState.data.map((item) => {
              return <option value={item.id}>{item.name}</option>;
            })}
          </Select>
        </HStack>
        <Divider />
        {getAdminProductState.data.data.map((item) => (
          <CardProductMobile
            id={item.id}
            name={item.name}
            price={item.price}
            stock={item.stock}
            image={item.imageUrl}
            key={item.id}
            refresh={() => setIsRefresh(!isRefresh)}
          />
        ))}
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
    </Wrapper>
  );
}
