import { Box, Button, Flex, HStack, Input, VStack } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { useEffect } from "react";
import Loading from "../../atoms/Loading";
import Select from "react-select";
import {
  SelectTheme,
  createAdminStyle,
} from "../../../themes/Select/ReactSelect.theme";
import { IProduct, OptionType } from "../../../data/interfaces";
import {
  DiscountType,
  PromotionType,
  VoucherType,
  constants,
} from "../../../data/constants";
import DiscountValue from "./DiscountValue";
import {
  createVoucherFormikConfig,
  formInitialState,
} from "../../../app/validation/createVoucherValidation.schema";
import FormField from "./FormField";
import { createVoucher } from "../../../app/redux/slice/Admin/discount/createVoucher";
import { createPromotion } from "../../../app/redux/slice/Admin/discount/createPromotion";

export default function VoucherCreationForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [currentVal, setVal] = useState<OptionType | null>(null);
  const createVoucherState = useSelector(
    (state: RootState) => state.createVoucher.apiState
  );
  const createPromotionState = useSelector(
    (state: RootState) => state.createPromotion.apiState
  );
  const branches = useSelector(
    (state: RootState) => state.createAdmin.branches
  );
  const products = useSelector(
    (state: RootState) => state.getAdminProductByBranch.products
  );
  const user = useSelector((state: RootState) => state.login.user);
  const FindBranch = () => {
    const branch = branches.find(
      (branch) => branch.name === user?.branch?.name
    );
    if (!branch) return undefined;
    const obj: OptionType = {
      label: branch!.name,
      value: String(branch?.id),
    };
    return obj;
  };
  const ResetForm = () => {
    formik.resetForm({
      errors: {},
      submitCount: 0,
      touched: {},
      values: formInitialState(user?.branchId as number),
    });
  };
  const formik = useFormik(
    createVoucherFormikConfig(
      formInitialState(user?.branchId as number),
      (value) => {
        if (value.discountType === DiscountType.VOUCHER) {
          dispatch(
            createVoucher({
              productId: !value.productId ? null : value.productId,
              voucher: {
                name: value.name,
                type: value.type,
                minimumPrice: Number(value.minPrice),
                dateStart: value.startDate,
                dateEnd: value.endDate,
                value: Number(value.value),
                valueType: value.valueType!,
              },
            })
          );
        } else {
          dispatch(
            createPromotion({
              productId: !value.productId ? null : value.productId,
              promotion: {
                name: value.name,
                type: value.type,
                dateStart: value.startDate,
                dateEnd: value.endDate,
                value: Number(value.value),
                valueType: value.valueType,
              },
            })
          );
        }
        ResetForm();
      }
    )
  );
  const boxRef = useRef<HTMLDivElement | null>(null);
  const generateProdOptions = (prod: IProduct[]) => {
    const options = prod.map((product) => {
      const option: OptionType = {
        label: product.name,
        value: String(product.id),
      };
      return option;
    });

    options.unshift({ value: "", label: "No Product" } as OptionType);
    return options;
  };
  useEffect(() => {
    if (formik.values.discountType === DiscountType.VOUCHER) {
      setVal(constants.voucherType[0]);
      formik.setFieldValue("type", constants.voucherType[0].value);
    } else {
      setVal(constants.promotionType[0]);
      formik.setFieldValue("type", constants.promotionType[0].value);
    }
  }, [formik.values.discountType]);

  return (
    <Box minW="300px" w={"full"} h={"92%"} ref={boxRef}>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          maxHeight: boxRef.current?.offsetHeight,
          overflow: "auto",
          height: "100%",
          padding: "0px 8px",
        }}
      >
        <VStack w={"full"} align={"start"} spacing={"1rem"} h={"full"}>
          <FormField
            formLabel="Discount Type"
            labelFor="disc"
            error={formik.errors.discountType}
            submitCount={formik.submitCount}
          >
            <Select
              id="disc"
              styles={createAdminStyle}
              theme={SelectTheme}
              options={constants.discountTypeField}
              defaultValue={constants.discountTypeField[0]}
              onChange={(option) =>
                formik.setFieldValue("discountType", option?.value)
              }
            />
          </FormField>

          <HStack w={"full"} spacing={"1rem"}>
            <FormField
              formLabel="Name"
              labelFor="name"
              error={formik.errors.name}
              submitCount={formik.submitCount}
            >
              <Input
                id="name"
                variant={"createAdmin"}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormField>

            <FormField
              formLabel="Branch"
              labelFor="branch"
              error={formik.errors.branchId}
              submitCount={formik.submitCount}
            >
              <Select
                id="branch"
                styles={createAdminStyle}
                theme={SelectTheme}
                options={branches.map((branch) => {
                  const option: OptionType = {
                    label: branch.name,
                    value: String(branch.id),
                  };
                  return option;
                })}
                defaultValue={FindBranch()}
                isDisabled={Boolean(user?.branch?.name)}
                onChange={(option) => {
                  formik.setFieldValue("branchId", Number(option?.value));
                }}
              />
            </FormField>
          </HStack>

          <HStack w={"full"} spacing={"1rem"}>
            <FormField
              formLabel="Type"
              labelFor="type"
              error={formik.errors.type}
              submitCount={formik.submitCount}
            >
              <Select
                id="type"
                styles={createAdminStyle}
                theme={SelectTheme}
                options={
                  formik.values.discountType === DiscountType.VOUCHER
                    ? constants.voucherType
                    : constants.promotionType
                }
                isSearchable={false}
                onChange={(option) => {
                  setVal(option);
                  formik.setFieldValue("type", option?.value);
                }}
                value={currentVal}
              />
            </FormField>

            <FormField
              formLabel="Product"
              labelFor="prod"
              error={formik.errors.productId}
              submitCount={formik.submitCount}
            >
              <Select
                id="prod"
                styles={createAdminStyle}
                theme={SelectTheme}
                options={generateProdOptions(products)}
                defaultValue={{ value: "", label: "No Product" } as OptionType}
                onChange={(option) => {
                  formik.setFieldValue("productId", Number(option!.value));
                }}
                isDisabled={
                  formik.values.type === VoucherType.FREE_SHIPPING ||
                  formik.values.type === VoucherType.TOTAL_PRICE_CUT
                }
              />
            </FormField>
          </HStack>

          <HStack w={"full"} spacing={"1rem"}>
            <FormField
              formLabel="Starts"
              error={formik.errors.startDate}
              submitCount={formik.submitCount}
            >
              <Input
                variant={"createAdmin"}
                type="datetime-local"
                onChange={(e) =>
                  formik.setFieldValue("startDate", e.target.value)
                }
                value={formik.values.startDate}
              />
            </FormField>

            <FormField
              formLabel="Ends"
              error={formik.errors.endDate}
              submitCount={formik.submitCount}
            >
              <Input
                variant={"createAdmin"}
                type="datetime-local"
                onChange={(e) =>
                  formik.setFieldValue("endDate", e.target.value)
                }
                value={formik.values.endDate}
              />
            </FormField>
          </HStack>
          {currentVal?.value === PromotionType.BUY_ONE_GET_ONE ||
          currentVal?.value === VoucherType.FREE_SHIPPING ? null : (
            <DiscountValue
              error={[
                formik.errors.value,
                formik.errors.valueType,
                formik.errors.minPrice,
              ]}
              values={[
                formik.values.value,
                formik.values.minPrice,
                formik.values.valueType,
              ]}
              submitCount={formik.submitCount}
              setFieldValue={formik.setFieldValue}
              type={formik.values.type}
            />
          )}

          <Flex w={"full"} justify={"center"} mt={"1rem"}>
            <Button
              type="submit"
              minW={"200px"}
              w={"full"}
              isDisabled={
                createVoucherState === "pending" ||
                createPromotionState === "pending"
              }
            >
              {createVoucherState === "pending" ||
              createPromotionState === "pending" ? (
                <Loading />
              ) : (
                "Create Discount"
              )}
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}
