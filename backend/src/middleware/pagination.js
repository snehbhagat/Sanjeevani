// Adds pagination/search/sort info to req.page
export default function pagination(defaultLimit = 10, maxLimit = 50) {
  return (req, _res, next) => {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(maxLimit, Math.max(1, parseInt(req.query.limit, 10) || defaultLimit));
    const sort = req.query.sort || '-createdAt'; // e.g., name,-createdAt
    const q = req.query.q || '';
    req.page = { page, limit, skip: (page - 1) * limit, sort, q };
    next();
  };
}
