import { GraphQLError } from "graphql";
import { APIError } from "graphql-hooks";
import getErrorCode from "../api-client/get-error-code";
import { AppToaster } from "../components/toaster";

export default function handleError(error: APIError<GraphQLError>): void {
  console.error(error);
  const message =
    (error.graphQLErrors && error.graphQLErrors[0])?.message ||
    error.fetchError?.message ||
    error.httpError?.statusText;

  const code = getErrorCode(error);

  AppToaster.show({
    message: code ? `${code}: ${message}` : message,
    icon: "error",
    intent: "danger"
  });
}
