function linkBuilder(baseUrl, { page, limit }, total) {
  try {
    const url = new URL(baseUrl, 'http://local');
    url.searchParams.set('limit', String(limit));
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const links = {};
    const make = (p) => {
      url.searchParams.set('page', String(p));
      return `${url.pathname}${url.search}`;
    };
    links.self = make(page);
    links.first = make(1);
    links.last = make(totalPages);
    if (page > 1) links.prev = make(page - 1);
    if (page < totalPages) links.next = make(page + 1);
    return links;
  } catch (_) {
    return undefined;
  }
}

export function sendSuccess(res, data, { message = 'Success', status = 200, meta, links } = {}, req) {
  return res.status(status).json({ success: true, message, data, meta, links, requestId: req?.id });
}

export function sendError(res, status, message, { code, details } = {}, req) {
  return res.status(status).json({ success: false, message, error: { code, details }, requestId: req?.id });
}

export { linkBuilder };

