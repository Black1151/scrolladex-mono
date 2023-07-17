import React from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { AppProps } from "next/app";

const Layout = ({ Component, pageProps, router }: AppProps) => {
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated.data
  );

  return (
    <>
      {loggedIn && <Navbar />}
      <Component {...pageProps} router={router} />
    </>
  );
};

export default Layout;
