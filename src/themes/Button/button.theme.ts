import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  variants: {
    primaryButton: {
      borderRadius: "17px",
      bg: "primaryColor",
      fontSize: "18px",
      color: "thirdColor",
      py: "1rem",
      _hover: {
        cursor: "pointer",
      },
    },
    secondaryButton: {
      borderRadius: "17px",
      border: "2px solid",
      ontSize: "18px",
      borderColor: "primaryColor",
      color: "primaryColor",
    },
    tertiaryButton: {
      color: "primaryColor",
      ontSize: "18px",
      border: "none",
    },
  },
  defaultProps: {
    variant: "primaryButton",
  },
});

export default Button;
