import { defineStyleConfig } from "@chakra-ui/react";

const Stepper = defineStyleConfig({
  variants: {
    order: {
      indicator: {
        borderRadius: "full",
        bg: "primaryColor",
        color: "white",
        fontSize: "20px",
      },
    },
  },
});

export default Stepper;
