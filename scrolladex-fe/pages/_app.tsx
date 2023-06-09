import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme/theme";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Navbar />
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}
