import type { AppProps } from "next/app";
import React from "react";
import '../styles.css';



function My2048NextApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default My2048NextApp;
