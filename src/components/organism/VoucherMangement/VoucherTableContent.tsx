/* eslint-disable react-hooks/exhaustive-deps */
import {
  AbsoluteCenter,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import SearchBar from "../../atoms/SearchBar";
import DeleteAlert from "../../molecules/UserManagement/DeleteAlert";
import Paginate from "../../molecules/Paginate";
import {
  fetchVoucherPaginate,
  setVoucherKeySearch,
} from "../../../app/redux/slice/Admin/discount/getVoucher";
import LoadingCenter from "../../molecules/Loading";
import DiscountValueDisplay from "../../atoms/voucherManagement/DiscountValueDisplay";
import { toCamelCase } from "../../../utils/function/toCamelCase";
import DetailButton from "./DetailButton";
import { DiscountType, VoucherType } from "../../../data/constants";
import DiscountStatus from "../../atoms/DiscountStatus";
import DiscountNotFound from "../../atoms/DiscountNotFound";
import ActionButton from "../../molecules/VoucherManagement/ActionButton";

export default function VoucherTableContent() {
  const dispatch = useDispatch<AppDispatch>();
  const alertDisclosure = useDisclosure();
  const [isScrollTop, setScrollTop] = useState<boolean>(true);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const prevSelectedPage = useRef<number>(0);
  const [adminId, setAdminId] = useState<number>(0);
  const apiState = useSelector((state: RootState) => state.getVoucher.apiState);
  const vouchers = useSelector((state: RootState) => state.getVoucher.vouchers);
  const key = useSelector((root: RootState) => root.getVoucher.keySearch);
  const sortBy = useSelector((state: RootState) => state.getVoucher.sortBy);
  const filterBy = useSelector((state: RootState) => state.getVoucher.filterBy);
  const deleteVoucherResp = useSelector(
    (state: RootState) => state.deleteVoucher.resp
  );
  const totalPage = useSelector(
    (state: RootState) => state.getVoucher.totalPages
  );
  const currentPage = useSelector(
    (state: RootState) => state.getVoucher.currentPages
  );
  useEffect(() => {
    dispatch(
      fetchVoucherPaginate({
        page: prevSelectedPage.current === selectedPage ? 1 : selectedPage + 1,
        limit: 10,
        sortBy,
        filterBy,
        key,
      })
    );
    prevSelectedPage.current = selectedPage;
  }, [dispatch, sortBy, filterBy, key, selectedPage]);

  useEffect(() => {
    if (
      Object.keys(deleteVoucherResp).length === 0 &&
      deleteVoucherResp?.statusCode !== 200
    ) {
      return;
    }
    dispatch(
      fetchVoucherPaginate({
        page: prevSelectedPage.current === selectedPage ? 1 : selectedPage + 1,
        limit: 10,
        sortBy,
        filterBy,
        key,
      })
    );
    prevSelectedPage.current = selectedPage;
  }, [deleteVoucherResp]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (selectedItem: any) => {
    setSelectedPage(selectedItem.selected);
  };

  const contentHandle = () => {
    if (apiState === "done" && vouchers.length > 0) {
      return (
        <Tbody>
          {vouchers.map((voucher, index) => {
            return (
              <Tr key={index} fontWeight={"semibold"}>
                <Td>
                  <Text fontWeight={"bold"}>{voucher.name}</Text>
                </Td>
                <Td>
                  <DiscountStatus
                    startDate={voucher.dateStart}
                    endDate={voucher.dateEnd}
                  />
                </Td>
                <Td>
                  <DiscountValueDisplay
                    value={voucher.value}
                    valueType={voucher.valueType}
                    type={voucher.type}
                  />
                </Td>
                <Td>
                  <Text textTransform={"capitalize"}>
                    {toCamelCase(voucher.type)}
                  </Text>
                </Td>
                <Td>
                  {voucher.type === VoucherType.PRICE_CUT ? (
                    <DetailButton voucherId={voucher.id} />
                  ) : (
                    <Text>Not Assigned</Text>
                  )}
                </Td>
                <Td>
                  <ActionButton
                    id={voucher.id}
                    discountType={DiscountType.VOUCHER}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      );
    } else if (apiState === "done" && vouchers.length === 0) {
      return <DiscountNotFound caption="Voucher was not found" />;
    }
  };

  return (
    <VStack w={"full"} h={"full"}>
      <DeleteAlert
        isOpen={alertDisclosure.isOpen}
        onClose={() => {
          setAdminId(0);
          alertDisclosure.onClose();
        }}
        id={adminId}
      />
      <TableContainer
        w={"full"}
        overflowY={"auto"}
        h={"430px"}
        minH={"350px"}
        onScroll={(e) => {
          if (e.currentTarget.scrollTop > 0.1) {
            setScrollTop(false);
          } else {
            setScrollTop(true);
          }
        }}
      >
        <Table>
          <Thead
            bg={"thirdColor"}
            shadow={!isScrollTop ? "md" : "none"}
            transition={"0.1s ease"}
            position={"sticky"}
            top={0}
            zIndex={"1"}
          >
            <Tr>
              <Th>
                <SearchBar
                  placeHolder="Search voucher"
                  onChange={(val) => {
                    dispatch(setVoucherKeySearch(val));
                  }}
                />
              </Th>
              <Th>Status</Th>
              <Th>Value</Th>
              <Th>Type</Th>
              <Th>Products</Th>
              <Th>Aksi</Th>
            </Tr>
          </Thead>
          {contentHandle()}
        </Table>
        {apiState === "pending" ? (
          <AbsoluteCenter>
            <LoadingCenter />
          </AbsoluteCenter>
        ) : null}
      </TableContainer>
      <Paginate
        pageCount={totalPage}
        onPageChange={handlePageChange}
        forcePage={currentPage - 1 < 0 ? 0 : currentPage - 1}
      />
    </VStack>
  );
}
