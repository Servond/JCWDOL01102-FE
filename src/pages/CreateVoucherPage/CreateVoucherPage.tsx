import { AbsoluteCenter, Container, VStack, useToast } from "@chakra-ui/react";
import Navigation from "../../components/molecules/BackNavigation";
import VoucherCreationForm from "../../components/molecules/CreateVoucher/VoucherCreationForm";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { useEffect } from "react";
import { fetchBranches } from "../../app/redux/slice/Admin/userManagement/createAdmin";
import LoadingCenter from "../../components/molecules/Loading";
import { getProductByBranch } from "../../app/redux/slice/Admin/getProduct/getProductByBranch";
import { resetCreatePromotionState } from "../../app/redux/slice/Admin/discount/createPromotion";
import { resetCreateVoucherState } from "../../app/redux/slice/Admin/discount/createVoucher";

export default function CreateVoucherPage() {
  const toast = useToast();
  const createVoucher = useSelector(
    (state: RootState) => state.createVoucher.resp
  );
  const createPromotion = useSelector(
    (state: RootState) => state.createPromotion.resp
  );
  const branches = useSelector(
    (state: RootState) => state.createAdmin.branches
  );
  const apiState = useSelector(
    (state: RootState) => state.createAdmin.apiState
  );
  const products = useSelector(
    (state: RootState) => state.getAdminProductByBranch.products
  );
  const productApiState = useSelector(
    (state: RootState) => state.getAdminProductByBranch.apiState
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (
      createVoucher?.message === "" ||
      createVoucher === undefined ||
      Object.keys(createVoucher).length === 0 ||
      createPromotion?.message === "" ||
      createPromotion === undefined ||
      Object.keys(createPromotion).length === 0
    )
      return;
    toast({
      isClosable: true,
      position: "top",
      title: "Discount Creation",
      description: createVoucher?.message,
      status: createVoucher?.statusCode === 200 ? "success" : "error",
      duration: 5000,
    });
    dispatch(resetCreatePromotionState());
    dispatch(resetCreateVoucherState());
  }, [createVoucher, createPromotion, toast, dispatch]);

  useEffect(() => {
    if (branches.length > 0 || apiState === "done") return;
    dispatch(fetchBranches());
  }, [dispatch, branches, apiState]);

  useEffect(() => {
    if (products.length > 0 || productApiState === "done") return;
    dispatch(getProductByBranch());
  }, [dispatch, products, productApiState]);

  return (
    <VStack h={"full"} w={"full"}>
      {apiState === "pending" || productApiState === "pending" ? (
        <Container>
          <AbsoluteCenter>
            <LoadingCenter />
          </AbsoluteCenter>
        </Container>
      ) : (
        <>
          <Navigation pageBefore="Voucher List" />
          <VoucherCreationForm />
        </>
      )}
    </VStack>
  );
}
