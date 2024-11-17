import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import { graphql } from "@/types/gql";

const makeClient = () => {
  return createClient({
    url: "http://localhost:3000/api/graphql",
    exchanges: [cacheExchange, fetchExchange],
  });
};
const { getClient } = registerUrql(makeClient);

const ssrClient = getClient();

export { ssrClient, graphql };
