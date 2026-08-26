import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { slugify } from '@/lib/utils';

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
]);

export const ALLOWED_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.svg',
  '.gif',
]);

export function isImageSource(value: string | null | undefined): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('data:image/')
  ) {
    return true;
  }
  return /\.(svg|png|jpg|jpeg|webp|gif)(\?.*)?$/i.test(trimmed);
}

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: 'file-too-large' | 'invalid-file-type' | 'upload-failed';
}

export async function handleFileUpload(
  file: unknown,
  folder: 'products' | 'services'
): Promise<UploadResult> {
  if (!file || typeof file !== 'object' || !('size' in file) || !('name' in file)) {
    return { success: false, error: 'upload-failed' };
  }

  const uploadedFile = file as File;

  // If empty file
  if (uploadedFile.size === 0) {
    return { success: false };
  }

  // Check file size (limit 2MB)
  if (uploadedFile.size > MAX_FILE_SIZE) {
    return { success: false, error: 'file-too-large' };
  }

  // Check extension / MIME type
  const originalName = uploadedFile.name || 'upload';
  const dotIndex = originalName.lastIndexOf('.');
  const ext = dotIndex !== -1 ? originalName.slice(dotIndex).toLowerCase() : '';

  if (
    (!ALLOWED_MIME_TYPES.has(uploadedFile.type) && !ALLOWED_EXTENSIONS.has(ext)) ||
    !ALLOWED_EXTENSIONS.has(ext)
  ) {
    return { success: false, error: 'invalid-file-type' };
  }

  try {
    const rawBaseName = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName;
    const cleanBaseName = slugify(rawBaseName) || 'file';
    const timestamp = Date.now();
    const finalFileName = `${timestamp}-${cleanBaseName}${ext}`;

    const targetDir = join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(targetDir, { recursive: true });

    const targetPath = join(targetDir, finalFileName);
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await writeFile(targetPath, buffer);

    return {
      success: true,
      url: `/uploads/${folder}/${finalFileName}`,
    };
  } catch {
    return { success: false, error: 'upload-failed' };
  }
}
