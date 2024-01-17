import { FormikConfig, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  DiscountType,
  PromotionType,
  VoucherType,
  constants,
} from "../../data/constants";

export interface ICreateVoucherInitialState {
  discountType: string;
  name: string;
  type: string;
  productId: number | null;
  startDate: string;
  endDate: string;
  value: string | null;
  valueType: string | null;
  branchId: number;
  minPrice: string | null;
}

export const createDiscountValidator = Yup.object({
  discountType: Yup.string().required("Discount is required"),
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  productId: Yup.number().when("discountType", {
    is: DiscountType.PROMOTION,
    then: (schema) =>
      schema.required("Product is required").test({
        name: "prod",
        test: (value) => value > 0,
        message: "Product must be choosen",
      }),
    otherwise: (schema) => schema.nullable(),
  }),
  startDate: Yup.string()
    .test({
      name: "test",
      test: (value) => {
        const parsedDate = new Date(value!);
        return Boolean(parsedDate);
      },
      message: "Start Date fromat is wrong",
    })
    .required("Start date is required"),
  endDate: Yup.string()
    .test({
      name: "test",
      test: (value) => {
        const parsedDate = new Date(value!);
        return Boolean(parsedDate);
      },
      message: "End date fromat is wrong",
    })
    .required("End date is required"),
  value: Yup.string().when(["type"], {
    is: (value: string) =>
      value === PromotionType.BUY_ONE_GET_ONE ||
      value === VoucherType.FREE_SHIPPING,
    then: (schema) => schema.nullable(),
    otherwise: (schema) =>
      schema.required("Value is required").test({
        name: "test value",
        test: (value) => {
          const normalized = Number(value);
          return normalized > 0;
        },
        message: "Value cannot be 0",
      }),
  }),
  valueType: Yup.string().when(["type"], {
    is: (value: string) =>
      value === PromotionType.BUY_ONE_GET_ONE ||
      value === VoucherType.FREE_SHIPPING,
    then: (schema) => schema.nullable(),
    otherwise: (schema) => schema.required("Value type is required"),
  }),
  branchId: Yup.number()
    .required("Branch is Required")
    .test({
      name: "test branchId",
      test: (value) => {
        return Number(value) > 0;
      },
      message: "Invalid Branch",
    }),
  minPrice: Yup.string().when("type", {
    is: VoucherType.TOTAL_PRICE_CUT,
    then: (schema) => schema.required("Minimum price is required"),
    otherwise: (schema) => schema.nullable().transform(() => null),
  }),
});

export const formInitialState = (branchId: number) => {
  const obj: ICreateVoucherInitialState = {
    name: "",
    discountType: constants.discountTypeField[0].value,
    type: constants.voucherType[0].value,
    productId: Number(null),
    branchId,
    startDate: "",
    endDate: "",
    value: null,
    valueType: constants.discountValueType[0].value,
    minPrice: null,
  };

  return obj;
};

export const createVoucherFormikConfig = (
  initialState: ICreateVoucherInitialState,
  onSubmit: (
    values: ICreateVoucherInitialState,
    formikHelpers: FormikHelpers<ICreateVoucherInitialState>
  ) => void | Promise<unknown>
) => {
  const conf: FormikConfig<ICreateVoucherInitialState> = {
    initialValues: initialState,
    onSubmit: onSubmit,
    validationSchema: createDiscountValidator,
  };
  return conf;
};
