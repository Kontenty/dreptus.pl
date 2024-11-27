import { CodegenConfig } from "@graphql-codegen/cli";

const scalars = {
  DateTime: "string",
  BigInt: { input: "bigint", output: "string" },
};

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  overwrite: true,
  documents: ["app/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./types/gql/": {
      preset: "client",
      config: {
        scalars,
      },
    },
    "./types/gql/types.ts": {
      plugins: ["typescript"],
      config: {
        declarationKind: "interface",
        scalars,
      },
    },
  },
};

export default config;
