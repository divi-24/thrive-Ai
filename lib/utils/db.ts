import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

let db: ReturnType<typeof drizzle>;

if (process.env.NEXT_PUBLIC_DRIZZLE_DB_URL) {
  const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
  db = drizzle(sql, { schema });
} else {
  throw new Error('Database URL not found');
}

export { db };
