import { StylesConfig, ThemeConfig } from "react-select";

export const SelectTheme: ThemeConfig = (theme) => ({
  ...theme,
  borderRadius: 10,
});

export const SelectStyle: StylesConfig = {
  indicatorSeparator: () => ({ display: "none" }),
  container: (baseStyle) => ({ ...baseStyle, width: "180px" , minWidth : "140px"}),
  control: (base) => ({
    ...base,
    boxShadow: "none",
    border: "2px solid #B1B1B1",
    ":hover": {
      border: "2px solid #53B175",
    },
  }),
  option: (baseStyle) => ({
    ...baseStyle,
    backgroundColor: "white",
    color: "black",
    ":hover": {
      backgroundColor: "#53B175",
      color: "white",
    },
  }),
};
