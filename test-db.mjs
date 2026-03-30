import mysql from "mysql2/promise";

// Replace these with your actual Cal.pl credentials
const config = {
  host: "kontenty.cal24.pl", // e.g., s1.cal.pl or your domain
  user: "kontenty_wpdreptuspl_next15",
  password: "AtMFvZeyzPnLdt5QdmAJ",
  database: "kontenty_wpdreptuspl_next15",
  port: 3306,
  connectTimeout: 5000, // 5 seconds
};

async function testConnection() {
  try {
    console.log(`Checking connection to ${config.host}...`);
    const connection = await mysql.createConnection(config);
    console.log("✅ Success! The firewall is OPEN.");
    await connection.end();
  } catch (err) {
    console.error("❌ Connection Failed.");
    console.error("Error Code:", err.code);
    console.error("Full Error:", err.message);

    if (err.code === "ETIMEDOUT") {
      console.log("\nVerdict: The port 3306 is likely BLOCKED by a firewall.");
    } else if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.log(
        "\nVerdict: The port is open, but your user/password or '%' permission is wrong.",
      );
    }
  }
}

testConnection();
