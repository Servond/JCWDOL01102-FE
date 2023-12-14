import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface IFormFieldProps {
  formLabel: string;
  labelFor?: string;
  error: string | null | undefined;
  submitCount: number;
}

export default function FormField(props: PropsWithChildren<IFormFieldProps>) {
  return (
    <VStack w={"full"} align={"start"} spacing={"1px"}>
      <FormControl isInvalid={Boolean(props.error) && props.submitCount > 0}>
        <FormLabel
          htmlFor={props.labelFor}
          color={"forthColor"}
          fontSize={"1rem"}
        >
          {props.formLabel}
        </FormLabel>
        {props.children}
        {Boolean(props.error) && props.submitCount > 0 ? (
          <FormErrorMessage>{props.error}</FormErrorMessage>
        ) : null}
      </FormControl>
    </VStack>
  );
}
