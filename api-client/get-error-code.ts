import { GraphQLError } from "graphql";
import { APIError } from "graphql-hooks";
import { ErrorCode } from "./types";

export default function getErrorCode(
  error: APIError<GraphQLError>
): ErrorCode | null {
  return (
    (error.graphQLErrors &&
      (error.graphQLErrors[0].extensions?.code as ErrorCode)) ||
    null
  );
}
