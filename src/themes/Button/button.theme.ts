import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  variants: {
    primaryButton: {
      borderRadius: "17px",
      bg: "primaryColor",
      fontSize: "18px",
      color: "thirdColor",
      py: "1.5rem",
      _hover: {
        cursor: "pointer",
      },
    },
    secondaryButton: {
      borderRadius: "17px",
      border: "2px solid",
      borderColor: "primaryColor",
      color: "primaryColor",
    },
    tertiaryButton: {
      color: "primaryColor",
      border: "none",
    },
  },
  defaultProps: {
    variant: "primaryButton",
  },
});

export default Button;
