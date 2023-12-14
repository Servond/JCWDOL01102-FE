import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import Select from "react-select";
import {
  SelectTheme,
  createAdminStyle,
} from "../../../themes/Select/ReactSelect.theme";
import {
  DiscountValueType,
  VoucherType,
  constants,
} from "../../../data/constants";
import FormField from "./FormField";
import { FormikErrors } from "formik";
import { ICreateVoucherInitialState } from "../../../app/validation/createVoucherValidation.schema";
import { useEffect } from "react";

interface IDiscountValProps {
  error: (string | undefined)[];
  submitCount: number;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => Promise<FormikErrors<ICreateVoucherInitialState>> | Promise<void>;
  type: string;
  values: unknown[];
}

export default function DiscountValue(props: IDiscountValProps) {
  useEffect(() => {
    props.setFieldValue("value", "0");
  }, [props.values[2]]);
  return (
    <HStack w={"full"} spacing={"1rem"}>
      <FormField
        formLabel="Value"
        labelFor="value"
        error={props.error[0]}
        submitCount={props.submitCount}
      >
        <Input
          id="value"
          variant={"createAdmin"}
          type="number"
          onChange={(e) => {
            const type = props.values[2];
            console.log(type);
            const valNow = e.target.value;
            const isNumber = /^[0-9]*$/.test(valNow);
            if (!isNumber) return;
            if (type === DiscountValueType.PERCENTAGE && Number(valNow) > 100)
              return;
            props.setFieldValue("value", e.target.value);
          }}
          value={String(props.values[0])}
        />
      </FormField>
      <VStack
        w={props.type === VoucherType.TOTAL_PRICE_CUT ? "full" : "30%"}
        align={"start"}
        spacing={"1px"}
      >
        <FormControl
          isInvalid={Boolean(props.error[1]) && props.submitCount > 0}
        >
          <FormLabel htmlFor="name" color={"forthColor"} fontSize={"1rem"}>
            Value Type
          </FormLabel>
          <Select
            styles={createAdminStyle}
            theme={SelectTheme}
            options={constants.discountValueType}
            defaultValue={constants.discountValueType[0]}
            isSearchable={false}
            onChange={(option) =>
              props.setFieldValue("valueType", option?.value)
            }
          />
        </FormControl>
        {Boolean(props.error[1]) && props.submitCount > 0 ? (
          <FormErrorMessage>{props.error[1]}</FormErrorMessage>
        ) : null}
      </VStack>
      {props.type === VoucherType.TOTAL_PRICE_CUT ? (
        <FormField
          formLabel="Min Price"
          labelFor="value"
          error={props.error[2]}
          submitCount={props.submitCount}
        >
          <Input
            id="minPrice"
            type="number"
            variant={"createAdmin"}
            onChange={(e) => {
              props.setFieldValue("minPrice", e.target.value);
            }}
            value={String(props.values[1])}
          />
        </FormField>
      ) : null}
    </HStack>
  );
}
