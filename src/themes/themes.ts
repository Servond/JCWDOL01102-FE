import { extendTheme } from "@chakra-ui/theme-utils";
import Button from "./Button/button.theme";
import Checkbox from "./Checkbox/checkbox.theme";
import Input from "./Input/input.theme";
import Select from "./Select/Select.theme";
import Menu from "./Menu/menu.theme";

export const globalTheme = extendTheme({
  colors: {
    bodyBgColor: "#E5E5E5",
    primaryColor: "#53B175",
    secondaryColor: "#B1B1B1",
    thirdColor: "#FCFCFC",
    forthColor: "#7C7C7C",
    successColor: "#53B175",
    superAdminColor: "#EDF7FC",
    branchAdminColor: "#F4EBF7",
    userColor: "#F4EBF7",
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
    Button,
    Checkbox,
    Input,
    Select,
    Menu,
  },
});
