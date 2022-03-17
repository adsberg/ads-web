import "../styles/globals.css";
import { ClientContext } from "graphql-hooks";
import { useGraphQLClient } from "../lib/graphql-client";
import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const graphQLClient = useGraphQLClient(pageProps.initialGraphQLState);

  return (
    <ClientContext.Provider value={graphQLClient}>
      <Component {...pageProps} />
    </ClientContext.Provider>
  );
}
