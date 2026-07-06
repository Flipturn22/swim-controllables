import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import pg from "pg";

export const runtime = "nodejs";

const SETUP_KEY = "flipturn-setup-once";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("key") !== SETUP_KEY) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL;
  if (!url) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "POSTGRES_URL is not set on Vercel. Re-link Supabase integration or add database URL in project env vars.",
      },
      { status: 500 }
    );
  }

  const sql = readFileSync(join(process.cwd(), "supabase", "schema.sql"), "utf8");
  const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    await client.query(sql);
    return NextResponse.json({ ok: true, message: "Flipturn database schema applied." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  } finally {
    await client.end();
  }
}
