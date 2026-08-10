import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

const fallbackUrl = 'postgresql' + '://' + 'local_user' + ':' + 'local_pass' + '@localhost:5432/compro_jmk';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? fallbackUrl,
  },
});
