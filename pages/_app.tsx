import "../styles/globals.css";
import { AppProps } from "next/app";
import { Toaster } from "@blueprintjs/core";
import Layout from "../components/page/Layout";
import { AuthProvider } from "../lib/auth";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider {...pageProps}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster className="app-toaster" />
    </AuthProvider>
  );
}
