import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { requireDb } from '@/db';
import { services } from '@/db/schema';

function redirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: { Location: location },
  });
}

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const action = String(formData.get('action') ?? '');

  try {
    const db = requireDb();

    if (action === 'create') {
      const name = String(formData.get('name') ?? '').trim();
      const description = String(formData.get('description') ?? '').trim();
      const icon = String(formData.get('icon') ?? '').trim();

      if (!name || !description || !icon) {
        return redirect('/admin/services?status=validation-error');
      }

      await db.insert(services).values({ name, description, icon });
      return redirect('/admin/services?status=created');
    }

    if (action === 'update') {
      const id = Number(formData.get('id'));
      const name = String(formData.get('name') ?? '').trim();
      const description = String(formData.get('description') ?? '').trim();
      const icon = String(formData.get('icon') ?? '').trim();

      if (!id || !name || !description || !icon) {
        return redirect('/admin/services?status=validation-error');
      }

      await db.update(services).set({ name, description, icon }).where(eq(services.id, id));
      return redirect('/admin/services?status=updated');
    }

    if (action === 'delete') {
      const id = Number(formData.get('id'));

      if (!id || Number.isNaN(id)) {
        return redirect('/admin/services?status=validation-error');
      }

      await db.delete(services).where(eq(services.id, id));
      return redirect('/admin/services?status=deleted');
    }

    return redirect('/admin/services?status=db-error');
  } catch {
    return redirect('/admin/services?status=db-error');
  }
};
