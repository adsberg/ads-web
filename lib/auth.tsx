import { GraphQLError } from "graphql";
import { ClientContext, GraphQLClient, useQuery } from "graphql-hooks";
import Router from "next/router";
import React, { useContext, createContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import config from "./config";
import { useGraphQLClient } from "./graphql-client";
import handleError from "./handle-api-error";

export interface AuthContextValue {
  setAuthToken: (token: string | null) => void;
  isSignedIn: () => boolean;
  signOut: () => void;
  client: GraphQLClient;
}

const AuthContext = createContext<AuthContextValue>(null as never);

export function AuthProvider({ children, initialGraphQLState }: any) {
  const auth = useProvideAuth(initialGraphQLState);

  return (
    <AuthContext.Provider value={auth}>
      <ClientContext.Provider value={auth.client}>
        {children}
      </ClientContext.Provider>
    </AuthContext.Provider>
  );
}

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

export const useUser = () => {
  const { data, error, loading } = useQuery<
    { user: CurrentUser | null },
    object,
    GraphQLError
  >(CURRENT_USER_QUERY);

  const user = data?.user || null;
  useEffect(() => {
    if (error) handleError(error);
  }, [error]);

  return { user, loading, error };
};

export const useAuth = ({ redirectTo = "", redirectIfFound = false } = {}) => {
  const context = useContext(AuthContext);
  const isSignedIn = context.isSignedIn();

  useEffect(() => {
    if (
      redirectTo &&
      ((!redirectIfFound && !isSignedIn) || (redirectIfFound && isSignedIn))
    ) {
      Router.push(redirectTo);
    }
  }, [redirectIfFound, redirectTo, isSignedIn]);

  return context;
};

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
