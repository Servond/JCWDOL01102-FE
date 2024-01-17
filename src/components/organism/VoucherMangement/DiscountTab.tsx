import { Tab, TabList, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import VoucherTableContent from "./VoucherTableContent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect } from "react";
import {
  resetManageProductState,
  setCheckboxValue,
} from "../../../app/redux/slice/Admin/discount/manageProductVoucher";
import PromoTableContent from "./PromoTableContent";
import LazyLoadTab from "../../molecules/VoucherManagement/LazyLoadTab";
import { setDiscountTabsCurrent } from "../../../app/redux/slice/Admin/discount/discountTabs";
import { resetPromotionPagination } from "../../../app/redux/slice/Admin/discount/getPromo";
import { resetVoucherPagination } from "../../../app/redux/slice/Admin/discount/getVoucher";
import { resetDeleteVoucherState } from "../../../app/redux/slice/Admin/discount/deleteVoucher";
import { resetDeletePromotionState } from "../../../app/redux/slice/Admin/discount/deletePromotion";

export default function DiscountTab() {
  const resp = useSelector(
    (state: RootState) => state.manageProductVoucher.resp
  );
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const currentTab = useSelector(
    (state: RootState) => state.discountTab.currentTab
  );
  const deleteVoucherResp = useSelector(
    (state: RootState) => state.deleteVoucher.resp
  );
  const deletePromotionResp = useSelector(
    (state: RootState) => state.deletePromotoin.resp
  );
  useEffect(() => {
    if (Object.keys(resp).length === 0 || resp.message === "") {
      return;
    }
    toast({
      isClosable: true,
      position: "top",
      title: "Product Assignment",
      description: resp?.message,
      status: resp?.statusCode === 200 ? "success" : "error",
      duration: 5000,
    });
    dispatch(resetManageProductState());
    dispatch(setCheckboxValue([]));
  }, [resp, toast, dispatch]);

  useEffect(() => {
    const isDeleteVoucher = Boolean(Object.keys(deleteVoucherResp).length);
    const isDeletePromotion = Boolean(Object.keys(deletePromotionResp).length);
    if (!isDeleteVoucher && !isDeletePromotion) {
      return;
    }
    toast({
      isClosable: true,
      position: "top",
      title: "Delete Discount",
      description: isDeleteVoucher
        ? deleteVoucherResp.message
        : deletePromotionResp.message,
      status:
        deleteVoucherResp?.statusCode === 200 ||
        deletePromotionResp.statusCode === 200
          ? "success"
          : "error",
      duration: 5000,
    });

    if (isDeleteVoucher) {
      dispatch(resetDeleteVoucherState());
    } else {
      dispatch(resetDeletePromotionState());
    }
  }, [deletePromotionResp, deleteVoucherResp, toast, dispatch]);

  const handelOnchange = (index: number) => {
    dispatch(setDiscountTabsCurrent(index));
    if (index === 0) {
      dispatch(resetPromotionPagination());
    } else {
      dispatch(resetVoucherPagination());
    }
  };
  return (
    <Tabs
      variant={"discountTab"}
      w={"full"}
      onChange={handelOnchange}
      index={currentTab}
    >
      <TabList w={"full"}>
        <Tab>Voucher</Tab>
        <Tab>Promotion</Tab>
      </TabList>
      <TabPanels w={"full"}>
        <LazyLoadTab index={0} currentIndex={currentTab}>
          <VoucherTableContent />
        </LazyLoadTab>
        <LazyLoadTab index={1} currentIndex={currentTab}>
          <PromoTableContent />
        </LazyLoadTab>
      </TabPanels>
    </Tabs>
  );
}
