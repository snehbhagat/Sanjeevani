import { randomUUID } from 'crypto';

// Attaches a unique request id and locale (from Accept-Language) to each request
export default function requestContext() {
  return (req, _res, next) => {
    try {
      req.id = randomUUID();
    } catch (_) {
      // Fallback for very old Node versions
      req.id = Math.random().toString(36).slice(2);
    }
    const acceptLanguage = req.headers['accept-language'];
    req.locale = (acceptLanguage?.split(',')[0] || process.env.DEFAULT_LOCALE || 'en').toLowerCase();
    next();
  };
}
