import { sendError } from '../utils/response.js';

const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err);
  const status = err.statusCode || err.status || 500;
  const code = err.code || (status === 500 ? 'INTERNAL_ERROR' : 'REQUEST_ERROR');
  const message = err.expose ? err.message : status === 500 ? 'Something went wrong' : err.message;
  return sendError(res, status, message, { code, details: err.details }, req);
};

export default errorHandler;
