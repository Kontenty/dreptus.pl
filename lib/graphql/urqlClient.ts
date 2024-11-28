import { cacheExchange, createClient, fetchExchange } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import { graphql } from "@/types/gql";

const host = process.env.VERCEL_URL ?? "localhost:3000";
const protocol = process.env.VERCEL_URL ? "https" : "http";

const makeClient = () => {
  return createClient({
    url: `${protocol}://${host}/api/graphql`,
    exchanges: [cacheExchange, fetchExchange],
  });
};
const { getClient } = registerUrql(makeClient);

const ssrClient = getClient();

export { ssrClient, graphql };
