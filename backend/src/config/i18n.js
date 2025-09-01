const messages = {
  en: {
    OK: 'Success',
    USERS_LISTED: 'Users retrieved',
    DONORS_LISTED: 'Donors retrieved',
    REQUESTS_LISTED: 'Requests retrieved',
    USER_PROFILE: 'User profile',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Something went wrong',
  },
  hi: {
    OK: 'सफलता',
    DONORS_LISTED: 'दाताओं की सूची',
    REQUESTS_LISTED: 'अनुरोधों की सूची',
    NOT_FOUND: 'संसाधन नहीं मिला',
    SERVER_ERROR: 'कुछ गलत हो गया',
  },
};

export function t(locale = 'en', key, fallback) {
  const lang = messages[locale] ? locale : 'en';
  return messages[lang][key] || fallback || key;
}
