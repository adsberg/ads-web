import { ClientContext, GraphQLClient } from "graphql-hooks";
import React, { useContext, createContext } from "react";
import { useCookies } from "react-cookie";
import config from "./config";
import { useGraphQLClient } from "./graphql-client";

export interface AuthContextValue {
  setAuthToken: (token: string | null) => void;
  isSignedIn: () => boolean;
  signOut: () => void;
  client: GraphQLClient;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children, pageProps }: any) {
  const auth = useProvideAuth(pageProps.initialGraphQLState);

  return (
    <AuthContext.Provider value={auth}>
      <ClientContext.Provider value={auth.client}>
        {children}
      </ClientContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const CURRENT_USER_QUERY = `
  query Me {
    user:me {
      id
      email
      username
    }
  }
`;

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
}

function useProvideAuth(initialGraphQLState?: object): AuthContextValue {
  const [cookies, setCookie, deleteCookie] = useCookies([
    config.userTokenStoreName
  ]);
  const client = useGraphQLClient(initialGraphQLState);
  const token = cookies[config.userTokenStoreName];
  if (token) client.setHeader("Authorization", `Bearer ${token}`);

  const isSignedIn = () => {
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  const setAuthToken = (token: string | null) => {
    if (token) {
      client.setHeader("Authorization", `Bearer ${token}`);
      setCookie(config.userTokenStoreName, token, {
        maxAge: config.userTokenMaxAge
      });
    } else {
      client.removeHeader("Authorization");
      deleteCookie(config.userTokenStoreName);
    }
  };

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isSignedIn,
    signOut,
    client
  };
}
