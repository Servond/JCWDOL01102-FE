import { extendTheme } from "@chakra-ui/theme-utils";

export const globalTheme = extendTheme({
  colors: {
    bodyBgColor: "#E5E5E5",
    primaryColor: "#53B175",
    secondaryColor: "#B1B1B1",
    thirdColor: "#FCFCFC",
    forthColor: "#7C7C7C",
    successColor: "#53B175",
  },
  styles: {
    global: {
      body: {
        backgroundColor: "bodyBgColor",
        "::-webkit-scrollbar": {
          display: "none",
        },
      },
    },
  },
  fonts: {
    html: "'Roboto', sans-serif",
  },
  components: {
    HStack: {
      variants: {
        addProduct: {
          w: "100%",
          justifyContent: {
            base: "center",
            md: "flex-start",
          },
        },
      },
    },
  },
});
