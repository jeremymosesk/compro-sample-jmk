import type { APIRoute } from 'astro';
import { eq } from 'drizzle-orm';
import { requireDb } from '@/db';
import { products } from '@/db/schema';
import { slugify, toBoolean } from '@/lib/utils';

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
      const slugInput = String(formData.get('slug') ?? '').trim();
      const description = String(formData.get('description') ?? '').trim();
      const category = String(formData.get('category') ?? '').trim();
      const imageUrl = String(formData.get('imageUrl') ?? '').trim();
      const candidateSlug = slugInput || slugify(name);

      if (!name || !description || !category || !imageUrl || !candidateSlug) {
        return redirect('/admin/products?status=validation-error');
      }

      await db.insert(products).values({
        name,
        slug: candidateSlug,
        description,
        category,
        imageUrl,
        isFeatured: toBoolean(formData.get('isFeatured')),
      });

      return redirect('/admin/products?status=created');
    }

    if (action === 'update') {
      const id = Number(formData.get('id'));
      const name = String(formData.get('name') ?? '').trim();
      const slug = String(formData.get('slug') ?? '').trim();
      const description = String(formData.get('description') ?? '').trim();
      const category = String(formData.get('category') ?? '').trim();
      const imageUrl = String(formData.get('imageUrl') ?? '').trim();
      const candidateSlug = slug || slugify(name);

      if (!id || !name || !description || !category || !imageUrl || !candidateSlug) {
        return redirect('/admin/products?status=validation-error');
      }

      await db
        .update(products)
        .set({
          name,
          slug: candidateSlug,
          description,
          category,
          imageUrl,
          isFeatured: toBoolean(formData.get('isFeatured')),
          updatedAt: new Date(),
        })
        .where(eq(products.id, id));

      return redirect('/admin/products?status=updated');
    }

    if (action === 'delete') {
      const id = Number(formData.get('id'));

      if (!id || Number.isNaN(id)) {
        return redirect('/admin/products?status=validation-error');
      }

      await db.delete(products).where(eq(products.id, id));
      return redirect('/admin/products?status=deleted');
    }

    return redirect('/admin/products?status=db-error');
  } catch {
    return redirect('/admin/products?status=db-error');
  }
};
