import type { APIRoute } from 'astro';
import { requireDb } from '@/db';
import { companyInfo } from '@/db/schema';
import { seededCompanyInfo } from '@/lib/site-data';

function redirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: { Location: location },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  try {
    const db = requireDb();

    for (const field of seededCompanyInfo) {
      const value = String(formData.get(field.key) ?? '').trim();
      await db
        .insert(companyInfo)
        .values({ key: field.key, value: value || field.value })
        .onConflictDoUpdate({
          target: companyInfo.key,
          set: { value: value || field.value },
        });
    }

    return redirect('/admin?status=company-updated');
  } catch (error) {
    console.error('Error saat memperbarui informasi perusahaan:', error);
    return redirect('/admin?status=db-error');
  }
};
