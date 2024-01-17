import { defineStyleConfig } from "@chakra-ui/react";

const Menu = defineStyleConfig({
  variants: {
    dropdown: {
      button: {
        fontWeight: "medium",
        bg: "transaparent",
        color: "forthColor",
        border: "1px solid",
        borderColor: "gray.200",
        borderRadius: "10px",
        py: "8px",
        px: "1rem",
        textAlign: "start",
        w: "full",
        _focus: {
          border: "2px solid",
          borderColor: "primaryColor",
        },
      },
      list: {
        py: "8px",
        borderRadius: "10px",
        border: "1px solid",
        borderColor: "gray.200",
        minH: "100px",
        maxH: "200px",
        overflowY: "auto",
      },
      item: {
        _hover: {
          bg: "primaryColor",
          color: "white",
        },
      },
    },
  },
});

export default Menu;
