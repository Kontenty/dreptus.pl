// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createYogaContext } from "@/lib/graphql/context";
import { schema } from "@/lib/graphql/schema";
import { createYoga } from "graphql-yoga";

const { handleRequest } = createYoga({
  schema,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
  context: createYogaContext,
  logging: "debug",
});

export {
  handleRequest as GET,
  handleRequest as POST,
  handleRequest as OPTIONS,
};
