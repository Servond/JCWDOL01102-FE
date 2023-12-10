import { defineStyleConfig } from "@chakra-ui/react";

const Input = defineStyleConfig({
  variants: {
    createAdmin: {
      field: {
        border: "1px solid",
        borderColor: "secondaryColor",
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
    editName: {
      field: {
        border: "1px solid",
        borderColor: "secondaryColor",
        borderRadius: "5px",
        _focus: {
          border: "2px solid",
          borderColor: "primaryColor",
        },
        fontSize: "16px",
        h: "20px",
        color: "black",
        w: "auto",
      },
    },
  },
});

export default Input;
