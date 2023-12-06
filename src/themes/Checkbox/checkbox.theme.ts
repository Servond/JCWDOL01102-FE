import { defineStyleConfig } from "@chakra-ui/react";

const Checkbox = defineStyleConfig({
  baseStyle: {
    control: {
      bg: "white",
      _checked: {
        bg: "primaryColor",
        borderColor: "primaryColor",
      },
      borderColor: "primaryColor",
    },
  },
});

export default Checkbox;
