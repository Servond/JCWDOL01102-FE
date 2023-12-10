import { GroupBase, StylesConfig, ThemeConfig } from "react-select";
import { OptionType } from "../../data/interfaces";

export const SelectTheme: ThemeConfig = (theme) => ({
  ...theme,
  borderRadius: 10,
});

export const SelectStyle: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  indicatorSeparator: () => ({ display: "none" }),
  container: (baseStyle) => ({
    ...baseStyle,
    width: "180px",
    minWidth: "140px",
  }),
  control: (base) => ({
    ...base,
    boxShadow: "none",
    border: "1px solid #B1B1B1",
    ":hover": {
      border: "1px solid #53B175",
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

export const SelectBranchStyle: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  indicatorSeparator: () => ({ display: "none" }),
  container: (baseStyle) => ({
    ...baseStyle,
    width: "120px",
    minWidth: "80px",
  }),
  control: (base) => ({
    ...base,
    boxShadow: "none",
    border: "1px solid #B1B1B1",
    ":hover": {
      border: "1px solid #53B175",
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

export const createAdminStyle: StylesConfig<
  OptionType,
  false,
  GroupBase<OptionType>
> = {
  indicatorSeparator: () => ({ display: "none" }),
  container: (baseStyle) => ({
    ...baseStyle,
    width: "100%",
    minWidth: "80px",
  }),
  control: (base) => ({
    ...base,
    boxShadow: "none",
    border: "1px solid #B1B1B1",
    ":hover": {
      border: "1px solid #53B175",
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
