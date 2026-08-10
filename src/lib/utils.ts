import { whatsappMessage, whatsappNumber } from './site-data';

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getWhatsAppLink(number = whatsappNumber, message = whatsappMessage) {
  const normalized = number.replace(/[^\d]/g, '');
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export function toBoolean(value: FormDataEntryValue | null) {
  return value === 'true' || value === 'on';
}
