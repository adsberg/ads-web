import { GraphQLError } from "graphql";
import { ClientContext, useQuery } from "graphql-hooks";
import Router from "next/router";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import config from "./config";
import handleError from "./handle-api-error";

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

export const useCurrentUser = ({
  redirectTo = "",
  redirectIfFound = false
} = {}) => {
  const client = useContext(ClientContext);
  const [cookies, setCookie] = useCookies([config.userTokenStoreName]);
  const existingToken = cookies[config.userTokenStoreName];
  if (existingToken)
    client.setHeader("Authorization", `Bearer ${existingToken}`);

  const { data, error, refetch } = useQuery<
    { user: CurrentUser | null },
    object,
    GraphQLError
  >(CURRENT_USER_QUERY);

  const user = data?.user;

  useEffect(() => {
    if (error) handleError(error);
    if (
      redirectTo &&
      ((!redirectIfFound && !user) || (redirectIfFound && user))
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo, error]);

  const updateUser = (user: CurrentUser | null) => {
    refetch({
      updateData: (cache, current) => {
        console.log(`cache`, cache);
        console.log(`current`, current);
        return { user };
      }
    });
  };

  const onLogin = (token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`);
    setCookie(config.userTokenStoreName, token);
    refetch();
  };

  const logout = () => {
    client.setHeader("Authorization", "");
    setCookie(config.userTokenStoreName, "");
    refetch();
  };

  return { user, onLogin, updateUser, logout };
};
