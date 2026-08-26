import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { requireDb } from '@/db';
import { services } from '@/db/schema';
import { handleFileUpload } from '@/lib/upload';

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
      let icon = String(formData.get('icon') ?? '').trim();
      const iconFile = formData.get('iconFile');

      // If file was uploaded for icon
      if (iconFile && typeof iconFile === 'object' && 'size' in iconFile && (iconFile as File).size > 0) {
        const uploadResult = await handleFileUpload(iconFile, 'services');
        if (!uploadResult.success) {
          return redirect(`/admin/services?status=${uploadResult.error ?? 'upload-failed'}`);
        }
        icon = uploadResult.url!;
      }

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
      let icon = String(formData.get('icon') ?? '').trim();
      const iconFile = formData.get('iconFile');

      // If file was uploaded on update
      if (iconFile && typeof iconFile === 'object' && 'size' in iconFile && (iconFile as File).size > 0) {
        const uploadResult = await handleFileUpload(iconFile, 'services');
        if (!uploadResult.success) {
          return redirect(`/admin/services?status=${uploadResult.error ?? 'upload-failed'}`);
        }
        icon = uploadResult.url!;
      }

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

    return redirect('/admin/services?status=validation-error');
  } catch (error) {
    console.error('Error pada API admin services:', error);
    return redirect('/admin/services?status=db-error');
  }
};
