import 'dotenv/config';
import { requireDb } from './index';
import { categories, companyInfo, contactLeads, products, services } from './schema';
import {
  seededCategories,
  seededCompanyInfo,
  seededProducts,
  seededServices,
} from '@/lib/site-data';

async function run() {
  const db = requireDb();

  await db.delete(contactLeads);
  await db.delete(products);
  await db.delete(categories);
  await db.delete(services);
  await db.delete(companyInfo);

  await db.insert(categories).values(seededCategories.map((category) => ({ ...category })));
  await db.insert(products).values(seededProducts.map((product) => ({ ...product })));
  await db.insert(services).values(seededServices.map((service) => ({ ...service })));
  await db.insert(companyInfo).values(seededCompanyInfo.map((entry) => ({ ...entry })));

  console.log('Seed berhasil dijalankan.');
}

run().catch((error) => {
  console.error('Seed gagal:', error);
  process.exit(1);
});
