import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

const sql = connectionString
  ? postgres(connectionString, {
      prepare: false,
    })
  : null;

export const db = sql ? drizzle(sql, { schema }) : null;

export function isDatabaseAvailable() {
  return db !== null;
}

export function requireDb() {
  if (!db) {
    throw new Error('DATABASE_URL belum dikonfigurasi.');
  }

  return db;
}
