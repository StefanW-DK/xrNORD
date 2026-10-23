/**
 * Run once to create the consent_log table in Neon.
 * Usage: npx tsx scripts/init-db.ts
 * Requires DATABASE_URL to be set in .env.development.local
 */
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS consent_log (
      id            SERIAL PRIMARY KEY,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      name          TEXT        NOT NULL,
      email         TEXT        NOT NULL,
      job_title     TEXT        NOT NULL,
      marketing_consent BOOLEAN NOT NULL DEFAULT FALSE,
      consent_text  TEXT        NOT NULL,
      ip_address    TEXT,
      page          TEXT        NOT NULL DEFAULT '/Compliance'
    )
  `;
  console.log("Table consent_log created (or already exists).");
}

main().catch(err => { console.error(err); process.exit(1); });
