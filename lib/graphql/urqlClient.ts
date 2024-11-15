import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";

const makeClient = () => {
  return createClient({
    url: "http://localhost:3000/api/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });
};
const { getClient } = registerUrql(makeClient);

export const ssrClient = getClient();
