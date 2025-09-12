import 'dotenv/config';

export const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || '';
export const ENCRYPTION_KEYS = (process.env.SANJEEVANI_ENC_KEYS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean); // base64 keys
if (ENCRYPTION_KEYS.length === 0) {
  console.warn('WARNING: No SANJEEVANI_ENC_KEYS provided. Encryption will fail for protected fields.');
}