import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import Layout from "@/components/layout/Layout";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Layout Component={Component} pageProps={pageProps} router={router} />
      </ChakraProvider>
    </Provider>
  );
}
