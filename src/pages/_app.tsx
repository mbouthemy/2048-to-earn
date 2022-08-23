import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import React from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import '../styles.css';

const WalletConnectionProvider = dynamic(() => import("../components/Wallet"), {
  ssr: false,
});

const network = () => {
  switch (process.env.NEXT_PUBLIC_BUILD_ENV) {
    case "dev":
      return WalletAdapterNetwork.Devnet;
    case "prod":
      return WalletAdapterNetwork.Mainnet;
    default:
      return WalletAdapterNetwork.Devnet;
  }
};



function My2048NextApp({ Component, pageProps }: AppProps) {
  const localAddress = process.env.NEXT_PUBLIC_LOCAL_ADDRESS;

  return (
    <>
      <WalletConnectionProvider
        network={network()}
        localAddress={localAddress}
      >
        <Component {...pageProps} />
      </WalletConnectionProvider>
    </>
  );
}
export default My2048NextApp;
