import { defineStyleConfig } from "@chakra-ui/react";

const Tabs = defineStyleConfig({
  variants: {
    discountTab: {
      root: {
        w: "full",
      },
      tab: {
        borderStartStartRadius: "10px",
        borderStartEndRadius: "10px",
        border: "0.5px solid",
        borderColor: "secondaryColor",
        borderTop: "none",
        borderStart: "none",
        borderEnd: "none",
        borderBottom: "none",
        bg: "white",
        fontWeight: "semibold",
        _selected: {
          border: "0.5px solid",
          borderColor: "secondaryColor",
          color: "primaryColor",
          borderBottom: "none",
        },
      },
      tabpanel: {
        w: "full",
        border: "0.5px solid",
        borderColor: "secondaryColor",
        borderStart: "none",
        borderEnd: "none",
        borderBottom: "none",
      },
    },
  },
});

export default Tabs;
