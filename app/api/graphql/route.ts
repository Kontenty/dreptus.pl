// Next.js Custom Route Handler: https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { createYogaContext } from "@/lib/graphql/context";
import { schema } from "@/lib/graphql/schema";
import { createYoga } from "graphql-yoga";
import { NextResponse } from "next/server";

const { handleRequest } = createYoga({
  schema,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: "/api/graphql",

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
  context: createYogaContext,
  logging: "debug",
});

// export const GET = handleRequest;

// export {
//   handleRequest as GET,
//   handleRequest as POST,
//   handleRequest as OPTIONS,
// };
export async function GET(req: Request) {
  // Define a context object if needed or use an empty object.
  const ctx = {};

  // Forward the request to the GraphQL handler with both request and context.
  return handleRequest(req, ctx);
}

export async function POST(req: Request) {
  // Define a context object if needed or use an empty object.
  const ctx = {};

  // Forward the request to the GraphQL handler with both request and context
  return handleRequest(req, ctx);
}

export async function OPTIONS() {
  // Handle OPTIONS requests here if needed, usually for CORS.
  return NextResponse.json({ message: "OPTIONS request received" });
}
