import type { AstroCookies } from 'astro';
import crypto from 'node:crypto';

const COOKIE_NAME = 'jmk_admin_session';
const SESSION_DURATION_MS = 1000 * 60 * 60 * 8;

function getConfigValue(key: 'ADMIN_USERNAME' | 'ADMIN_PASSWORD' | 'SESSION_SECRET', fallback: string) {
  const value = process.env[key]?.trim();

  if (value) {
    return value;
  }

  if (import.meta.env.PROD) {
    throw new Error(`${key} wajib diatur pada environment produksi.`);
  }

  return fallback;
}

function getAdminUsername() {
  return getConfigValue('ADMIN_USERNAME', 'admin');
}

function getAdminPassword() {
  return getConfigValue('ADMIN_PASSWORD', 'admin123');
}

function getSessionSecret() {
  return getConfigValue('SESSION_SECRET', 'development-session-secret');
}

function base64Url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function sign(value: string) {
  return crypto.createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = crypto.createHash('sha256').update(left).digest();
  const rightBuffer = crypto.createHash('sha256').update(right).digest();

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function signaturesMatch(payload: string, signature: string) {
  return safeEqual(sign(payload), signature);
}

export function isValidAdminLogin(username: string, password: string) {
  return safeEqual(username, getAdminUsername()) && safeEqual(password, getAdminPassword());
}

export function createSessionValue() {
  const payload = base64Url(
    JSON.stringify({
      username: getAdminUsername(),
      expiresAt: Date.now() + SESSION_DURATION_MS,
    }),
  );

  return `${payload}.${sign(payload)}`;
}

export function verifySession(value: string | undefined) {
  if (!value) {
    return false;
  }

  const separatorIndex = value.indexOf('.');

  if (separatorIndex === -1) {
    return false;
  }

  const payload = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);

  if (!payload || !signature || !signaturesMatch(payload, signature)) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      username: string;
      expiresAt: number;
    };

    return safeEqual(parsed.username, getAdminUsername()) && parsed.expiresAt > Date.now();
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
