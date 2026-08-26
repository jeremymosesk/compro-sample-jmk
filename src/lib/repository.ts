import { asc, desc, eq, type InferSelectModel } from 'drizzle-orm';
import { getDb } from '@/db';
import { categories, companyInfo, products, services } from '@/db/schema';
import {
  seededCategories,
  seededCompanyInfo,
  seededProducts,
  seededServices,
} from '@/lib/site-data';

export type CompanyInfoMap = Record<string, string>;

type CategoryRow = InferSelectModel<typeof categories>;
type ProductRow = InferSelectModel<typeof products>;
type ServiceRow = InferSelectModel<typeof services>;
type CompanyInfoRow = InferSelectModel<typeof companyInfo>;

const fallbackTimestamp = new Date('2026-01-01T00:00:00.000Z');
const fallbackCategories: CategoryRow[] = seededCategories.map((category, index) => ({
  id: index + 1,
  ...category,
}));
const fallbackProducts: ProductRow[] = seededProducts.map((product, index) => ({
  id: index + 1,
  ...product,
  createdAt: fallbackTimestamp,
  updatedAt: fallbackTimestamp,
}));
const fallbackServices: ServiceRow[] = seededServices.map((service, index) => ({
  id: index + 1,
  ...service,
  createdAt: fallbackTimestamp,
}));
const fallbackCompanyInfoRows: CompanyInfoRow[] = seededCompanyInfo.map((entry, index) => ({
  id: index + 1,
  ...entry,
}));
const fallbackCompanyInfo = Object.fromEntries(fallbackCompanyInfoRows.map((entry) => [entry.key, entry.value]));

async function withFallback<T>(
  query: (database: NonNullable<ReturnType<typeof getDb>>) => Promise<T>,
  fallback: T
): Promise<T> {
  const database = getDb();
  if (!database) {
    return fallback;
  }

  try {
    return await query(database);
  } catch (error) {
    console.error('Query database error (fallback ke data lokal):', error);
    return fallback;
  }
}

export async function getCategories() {
  return withFallback(
    async (database) => database.select().from(categories).orderBy(asc(categories.name)),
    fallbackCategories,
  );
}

export async function getProducts() {
  return withFallback(
    async (database) => database.select().from(products).orderBy(asc(products.name)),
    fallbackProducts,
  );
}

export async function getFeaturedProducts(limit = 4) {
  const items = await withFallback(
    async (database) => database.select().from(products).where(eq(products.isFeatured, true)).orderBy(desc(products.createdAt)),
    fallbackProducts.filter((product) => product.isFeatured),
  );

  return items.slice(0, limit);
}

export async function getProductBySlug(slug: string) {
  const items = await withFallback(
    async (database) => database.select().from(products).where(eq(products.slug, slug)),
    fallbackProducts.filter((product) => product.slug === slug),
  );

  return items[0] ?? null;
}

export async function getServices() {
  return withFallback(
    async (database) => database.select().from(services).orderBy(asc(services.name)),
    fallbackServices,
  );
}

export async function getCompanyInfoMap(): Promise<CompanyInfoMap> {
  const rows = await withFallback(
    async (database) => database.select().from(companyInfo),
    fallbackCompanyInfoRows
  );

  return {
    ...fallbackCompanyInfo,
    ...Object.fromEntries(rows.map((row) => [row.key, row.value])),
  };
}
