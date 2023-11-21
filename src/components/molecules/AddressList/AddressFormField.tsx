import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

interface AddressFormFieldProps {
  label: string;
  error?: string;
  touched?: boolean;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function AddressFormField(props: AddressFormFieldProps) {
  return (
    <FormControl isInvalid={!!props.error && props.touched}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        type='text'
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={props.value}
      />
      <FormErrorMessage>{props.error}</FormErrorMessage>
    </FormControl>
  );
}
