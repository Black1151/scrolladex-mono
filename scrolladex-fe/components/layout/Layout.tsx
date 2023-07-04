import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AppProps } from "next/app";

const Layout = ({ Component, pageProps, router }: AppProps) => {
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated.data
  );

  console.log("Layout.tsx: loggedIn: ", loggedIn);

  return (
    <>
      {loggedIn && <Navbar />}
      <Component {...pageProps} router={router} />
    </>
  );
};

export default Layout;
