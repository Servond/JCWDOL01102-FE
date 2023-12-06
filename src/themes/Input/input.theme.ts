import { defineStyleConfig } from "@chakra-ui/react";

const Input = defineStyleConfig({
  variants: {
    createAdmin: {
      field: {
        border: "1px solid",
        borderColor: "gray.200",
        borderRadius: "10px",
        _focus: {
          border: "2px solid",
          borderColor: "primaryColor",
        },
      },
    },
    error: {
      field: {
        border: "2px solid",
        borderColor: "red.500",
        borderRadius: "10px",
      },
    },
  },
});

export default Input;
