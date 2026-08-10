import type { APIRoute } from 'astro';
import { isValidAdminLogin, setSessionCookie } from '@/lib/auth';

function redirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: { Location: location },
  });
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const formData = await request.formData();
  const username = String(formData.get('username') ?? '').trim();
  const password = String(formData.get('password') ?? '').trim();

  if (!isValidAdminLogin(username, password)) {
    return redirect('/admin/login?error=1');
  }

  setSessionCookie(cookies);
  return redirect('/admin');
};
