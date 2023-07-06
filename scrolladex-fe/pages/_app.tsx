if (process.env.NODE_ENV !== "production") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import { Provider } from "react-redux";
import { store } from "@/store/store";

import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/providers/AuthProvider";

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Layout Component={Component} pageProps={pageProps} router={router} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}
