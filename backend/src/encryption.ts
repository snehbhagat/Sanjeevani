import crypto from 'crypto';
import { ENCRYPTION_KEYS } from './env.js';

// AES-256-GCM helpers
// Ciphertext format (base64 after JSON stringify):
// { kid: number, iv: base64, tag: base64, ct: base64 }
interface CipherPayload {
  kid: number;
  iv: string;
  tag: string;
  ct: string;
}

function getKey(kid: number): Buffer {
  if (!ENCRYPTION_KEYS[kid]) throw new Error('Encryption key index not found');
  const raw = Buffer.from(ENCRYPTION_KEYS[kid], 'base64');
  if (raw.length !== 32) throw new Error('Key must be 32 bytes for AES-256-GCM');
  return raw;
}

export function encrypt(plain: string): string {
  if (ENCRYPTION_KEYS.length === 0) throw new Error('No encryption keys set');
  const kid = 0;
  const key = getKey(kid);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const payload: CipherPayload = {
    kid,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    ct: ct.toString('base64')
  };
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

export function decrypt(enc: string): string {
  if (!enc) return '';
  const buf = Buffer.from(enc, 'base64').toString('utf8');
  const payload: CipherPayload = JSON.parse(buf);
  const key = getKey(payload.kid);
  const decipher = crypto.createDecipheriv(
    'aes-256-gcm',
    key,
    Buffer.from(payload.iv, 'base64')
  );
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
  const pt = Buffer.concat([
    decipher.update(Buffer.from(payload.ct, 'base64')),
    decipher.final()
  ]);
  return pt.toString('utf8');
}

// Optional key rotation
export function rotate(enc: string): string {
  const plain = decrypt(enc);
  return encrypt(plain);
}