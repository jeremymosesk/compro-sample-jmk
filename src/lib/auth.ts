import type { AstroCookies } from 'astro';
import crypto from 'node:crypto';

const COOKIE_NAME = 'jmk_admin_session';
const USERNAME = 'admin';
const PASSWORD = 'admin123';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;

function getSessionSecret() {
  return process.env.SESSION_SECRET ?? 'development-session-secret';
}

function base64Url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

export function isValidAdminLogin(username: string, password: string) {
  return username === USERNAME && password === PASSWORD;
}

export function createSessionValue() {
  const payload = base64Url(
    JSON.stringify({
      username: USERNAME,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    }),
  );

  return `${payload}.${sign(payload)}`;
}

export function verifySession(value: string | undefined) {
  if (!value) {
    return false;
  }

  const [payload, signature] = value.split('.');

  if (!payload || !signature || sign(payload) !== signature) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      username: string;
      expiresAt: number;
    };

    return parsed.username === USERNAME && parsed.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function setSessionCookie(cookies: AstroCookies) {
  cookies.set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: import.meta.env.PROD,
    maxAge: 60 * 60 * 8,
  });
}

export function clearSessionCookie(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

export function isAuthenticated(cookies: AstroCookies) {
  return verifySession(cookies.get(COOKIE_NAME)?.value);
}
