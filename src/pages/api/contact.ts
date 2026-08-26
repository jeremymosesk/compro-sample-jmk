import type { APIRoute } from 'astro';
import { requireDb } from '@/db';
import { contactLeads } from '@/db/schema';

function redirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: { Location: location },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const phone = String(formData.get('phone') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !phone || !message) {
    return redirect('/contact?status=error');
  }

  try {
    const db = requireDb();
    await db.insert(contactLeads).values({ name, email, phone, message });
    return redirect('/contact?status=success');
  } catch (error) {
    console.error('Error saat menyimpan contact lead:', error);
    return redirect('/contact?status=db-error');
  }
};
