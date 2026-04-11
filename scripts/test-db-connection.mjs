/**
 * Database connection test script
 * Tests if Prisma client can connect to the database before building
 * Run this script before build: npx tsx scripts/test-db-connection.mjs
 */

import { cwd } from "node:process";
import nextEnv from "@next/env";
import { PrismaClient } from "@prisma/client";

const { loadEnvConfig } = nextEnv;

// Load environment variables
loadEnvConfig(cwd());

const dbUrl = process.env.DATABASE_CON_URL;
if (!dbUrl || !/^mysql:\/\/.+:.+@.+:.+$/.test(dbUrl)) {
  console.error(
    "❌ DATABASE_CON_URL environment variable is not set or invalid!",
  );
  process.exit(1);
}

async function testDatabaseConnection() {
  console.log("🧪 Testing database connection...");

  const prisma = new PrismaClient();

  try {
    // Test the connection with a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log(
      `✅ Database connection successful! db: ${dbUrl.split("/").at(-1)}`,
    );

    // Also verify we can access the wp_posts table (our main trip table)
    const result =
      await prisma.$queryRaw`SELECT COUNT(*) as count FROM wp_posts WHERE  post_type = 'listing' AND post_status = 'publish' LIMIT 1`;

    if (result && Array.isArray(result) && result.length > 0) {
      console.log(
        `✅ Database query successful. Found ${result[0].count} published trips.`,
      );
    }

    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed!");
    console.error("Error:", error);

    await prisma.$disconnect();
    process.exit(1);
  }
}

testDatabaseConnection();
