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
    dashboardAccepButton: {
      bg: "primaryColor",
      color: "thirdColor",
      fontSize: "medium",
      height: "30px",
      borderRadius: "5px",
      padding: "5px 20px",
    },
    dashboardRejectButton: {
      bgColor: "red.500",
      color: "thirdColor",
      fontSize: "medium",
      height: "30px",
      borderRadius: "5px",
      padding: "5px 20px",
    },
    dashboardDeleteButton: {
      bgColor: "gray.500",
      color: "thirdColor",
      fontSize: "medium",
      height: "30px",
      borderRadius: "5px",
      padding: "5px 20px",
    },
  },
  defaultProps: {
    variant: "primaryButton",
  },
});

export default Button;
