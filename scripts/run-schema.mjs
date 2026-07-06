import fs from "fs";
import pg from "pg";

const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
if (!url) {
  console.error("Missing POSTGRES_URL in environment");
  process.exit(1);
}

const sql = fs.readFileSync(new URL("../supabase/schema.sql", import.meta.url), "utf8");
const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  await client.query(sql);
  console.log("Schema applied successfully.");
} catch (err) {
  console.error("Schema failed:", err.message);
  process.exit(1);
} finally {
  await client.end();
}
