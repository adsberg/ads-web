import {
  GraphQLClient,
  Operation,
  UseClientRequestOptions
} from "graphql-hooks";

const defaultOpts: UseClientRequestOptions = { useCache: true };
/**
 * Returns the result of a GraphQL query. It also adds the result to the
 * cache of the GraphQL client for better initial data population in pages.
 *
 * Note: This helper tries to imitate what the query hooks of `graphql-hooks`
 * do internally to make sure we generate the same cache key
 */
export default async function graphQLRequest(
  client: GraphQLClient,
  query: string,
  options?: UseClientRequestOptions
) {
  const opts: UseClientRequestOptions = { ...defaultOpts, ...options };
  const operation: Operation = {
    query,
    variables: opts.variables,
    operationName: opts.operationName
  };

  if (opts.persisted || (client.useGETForQueries && !opts.isMutation)) {
    opts.fetchOptionsOverrides = {
      ...opts.fetchOptionsOverrides,
      method: "GET"
    };
  }

  const cacheKey = client.getCacheKey(operation, opts);
  const cacheValue = await client.request(operation, opts);

  client.saveCache(cacheKey, cacheValue);
  return cacheValue;
}
