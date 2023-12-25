/* eslint-disable react-hooks/exhaustive-deps */
import {
  AbsoluteCenter,
  Box,
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
import LoadingCenter from "../../molecules/Loading";
import SearchBar from "../../atoms/SearchBar";
import DeleteAlert from "../../molecules/UserManagement/DeleteAlert";
import Paginate from "../../molecules/Paginate";
import {
  fetchPromotionPaginate,
  setPromotionKeySearch,
} from "../../../app/redux/slice/Admin/discount/getPromo";
import { toCamelCase } from "../../../utils/function/toCamelCase";
import DiscountStatus from "../../atoms/DiscountStatus";
import DiscountNotFound from "../../atoms/DiscountNotFound";
import DiscountValueDisplay from "../../atoms/voucherManagement/DiscountValueDisplay";
import { DiscountType, PromotionType } from "../../../data/constants";
import ActionButton from "../../molecules/VoucherManagement/ActionButton";
// import { toGMT7 } from "../../../utils/function/toGMT7";

export default function PromoTableContent() {
  const dispatch = useDispatch<AppDispatch>();
  const alertDisclosure = useDisclosure();
  const [isScrollTop, setScrollTop] = useState<boolean>(true);
  const [selectedPage, setSelectedPage] = useState<number>(0);
  const prevSelectedPage = useRef<number>(0);
  const [adminId, setAdminId] = useState<number>(0);
  const apiState = useSelector(
    (state: RootState) => state.getPromotion.apiState
  );
  const promotions = useSelector(
    (state: RootState) => state.getPromotion.promotions
  );
  const key = useSelector((state: RootState) => state.getPromotion.keySearch);
  const sortBy = useSelector((state: RootState) => state.getPromotion.sortBy);
  const filterBy = useSelector(
    (state: RootState) => state.getPromotion.filterBy
  );
  const totalPage = useSelector(
    (state: RootState) => state.getPromotion.totalPages
  );
  const currentPage = useSelector(
    (state: RootState) => state.getPromotion.currentPages
  );
  const deletePromotionResp = useSelector(
    (state: RootState) => state.deletePromotoin.resp
  );
  useEffect(() => {
    dispatch(
      fetchPromotionPaginate({
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
      Object.keys(deletePromotionResp).length === 0 &&
      deletePromotionResp?.statusCode !== 200
    ) {
      return;
    }
    dispatch(
      fetchPromotionPaginate({
        page: prevSelectedPage.current === selectedPage ? 1 : selectedPage + 1,
        limit: 10,
        sortBy,
        filterBy,
        key,
      })
    );
    prevSelectedPage.current = selectedPage;
  }, [deletePromotionResp]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (selectedItem: any) => {
    setSelectedPage(selectedItem.selected);
  };

  const contentHandle = () => {
    if (apiState === "done" && promotions.length > 0) {
      return (
        <Tbody>
          {promotions.map((promotion, index) => {
            return (
              <Tr key={index} fontWeight={"semibold"}>
                <Td>
                  <Text fontWeight={"bold"}>{promotion.name}</Text>
                </Td>
                <Td>
                  <DiscountStatus
                    startDate={promotion.dateStart}
                    endDate={promotion.dateEnd}
                  />
                </Td>
                <Td>
                  {promotion.type !== PromotionType.BUY_ONE_GET_ONE ? (
                    <DiscountValueDisplay
                      value={promotion.value!}
                      valueType={promotion.valueType!}
                      type={promotion.type}
                    />
                  ) : (
                    <Text textTransform={"capitalize"}>not Assigned</Text>
                  )}
                </Td>
                <Td>
                  <Text textTransform={"capitalize"}>
                    {toCamelCase(promotion.type)}
                  </Text>
                </Td>
                <Td>
                  <Text>{promotion.product.name}</Text>
                </Td>
                <Td>
                  <ActionButton
                    id={promotion.id}
                    discountType={DiscountType.PROMOTION}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      );
    } else if (apiState === "done" && promotions.length === 0) {
      return <DiscountNotFound caption="Promotion was not found" />;
    }
  };

  return (
    <VStack w={"full"}>
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
                  placeHolder="Search promotions"
                  onChange={(key) => {
                    dispatch(setPromotionKeySearch(key));
                  }}
                />
              </Th>
              <Th>Status</Th>
              <Th>Value</Th>
              <Th>type</Th>
              <Th>Product</Th>
              <Th>Action</Th>
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
      <Box>
        <Paginate
          pageCount={totalPage}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1 < 0 ? 0 : currentPage - 1}
        />
      </Box>
    </VStack>
  );
}
