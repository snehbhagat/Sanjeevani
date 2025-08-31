import crypto from 'crypto';

const getKey = () => {
  const secret = process.env.AES_SECRET || 'defaultsecretdefaultsecretdefault!';
  return crypto.createHash('sha256').update(String(secret)).digest(); // 32 bytes
};

export const encrypt = (plainText) => {
  if (!plainText) return plainText;
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', getKey(), iv);
  let encrypted = cipher.update(String(plainText), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('base64') + ':' + encrypted;
};

export const decrypt = (cipherText) => {
  if (!cipherText) return cipherText;
  const [ivB64, data] = String(cipherText).split(':');
  const iv = Buffer.from(ivB64, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-cbc', getKey(), iv);
  let decrypted = decipher.update(data, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};
