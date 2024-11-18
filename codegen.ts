import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3000/api/graphql",
  overwrite: true,
  documents: ["app/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./types/gql/": {
      preset: "client",
      plugins: ["typescript"],
      config: {
        declarationKind: "interface",
        scalars: {
          DateTime: "string",
          BigInt: { input: "BigInt", output: "string" },
        },
      },
    },
  },
};

export default config;
