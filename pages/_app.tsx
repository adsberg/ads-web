import "../styles/globals.css";
import { ClientContext } from "graphql-hooks";
import { useGraphQLClient } from "../lib/graphql-client";
import { AppProps } from "next/app";
import { Toaster } from "@blueprintjs/core";
import Layout from "../components/page/Layout";

export default function App({ Component, pageProps }: AppProps) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);

  return (
    <ClientContext.Provider value={graphQLClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Toaster className="app-toaster" />
    </ClientContext.Provider>
  );
}
