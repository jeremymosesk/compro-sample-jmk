import { defineMiddleware } from 'astro:middleware';
import { isAuthenticated } from '@/lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const pathname = context.url.pathname;
  const authenticated = isAuthenticated(context.cookies);

  if (pathname === '/admin/login' && authenticated) {
    return context.redirect('/admin');
  }

  const isAdminPage = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isProtectedAdminApi = pathname.startsWith('/api/admin') && !['/api/admin/login', '/api/admin/logout'].includes(pathname);

  if (isAdminPage && !authenticated) {
    return context.redirect('/admin/login');
  }

  if (isProtectedAdminApi && !authenticated) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return next();
});
