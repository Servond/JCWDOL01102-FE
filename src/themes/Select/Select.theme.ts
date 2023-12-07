import { defineStyleConfig } from "@chakra-ui/react";

const Select = defineStyleConfig({
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
      menu: {
        border: "1px solid",
        borderColor: "gray.200",
        borderRadius: "10px",
      },
    },
  },
});

export default Select;
