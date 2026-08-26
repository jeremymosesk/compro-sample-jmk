import 'dotenv/config';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

function getConnectionString(): string | undefined {
  const envUrl =
    (typeof import.meta !== 'undefined' && import.meta.env?.DATABASE_URL) ||
    process.env.DATABASE_URL;

  return envUrl?.trim() || undefined;
}

let _db: PostgresJsDatabase<typeof schema> | null = null;
let _sql: ReturnType<typeof postgres> | null = null;

export function getDb(): PostgresJsDatabase<typeof schema> | null {
  if (_db) {
    return _db;
  }

  const connectionString = getConnectionString();
  if (!connectionString) {
    return null;
  }

  try {
    _sql = postgres(connectionString, {
      prepare: false,
      ssl: connectionString.includes('sslmode=require') ? 'require' : undefined,
    });
    _db = drizzle(_sql, { schema });
    return _db;
  } catch (error) {
    console.error('Koneksi database PostgreSQL gagal diinisialisasi:', error);
    return null;
  }
}

// Proxy/getter to always return active DB instance
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop) {
    const instance = getDb();
    if (!instance) {
      return undefined;
    }
    return (instance as unknown as Record<string, unknown>)[prop as string];
  },
});

export function isDatabaseAvailable(): boolean {
  return getDb() !== null;
}

export function requireDb(): PostgresJsDatabase<typeof schema> {
  const instance = getDb();
  if (!instance) {
    throw new Error('DATABASE_URL belum dikonfigurasi atau tidak dapat terhubung.');
  }

  return instance;
}
