import type { APIRoute } from 'astro';
import { clearSessionCookie } from '@/lib/auth';

export const POST: APIRoute = async ({ cookies }) => {
  clearSessionCookie(cookies);

  return new Response(null, {
    status: 302,
    headers: { Location: '/admin/login?logged_out=1' },
  });
};
