import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/redux/store.ts";
import { globalTheme } from "./themes/themes.ts";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={globalTheme}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
);
