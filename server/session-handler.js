const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, next) => {
  /**
   *
   * Parse cookies in incoming request:
   *
   */

  // req.get('Cookie') looks at Cookie header rcvd from the client.
  const cookieString = req.get('Cookie') || '';

  const parsedCookies = cookieString.split("; ").reduce((cookies, cookie) => {
    if (cookie.length) {
      let index = cookie.indexOf("=");
      let key = cookie.slice(0, index);
      let token = cookie.slice(index + 1);
      cookies[key] = token;
    }
    return cookies;
  }, {});

  if (parsedCookies.s_id) {
    req.session_id = parsedCookies.s_id;
  } else {
    req.session_id = uuidv4();
    res.cookie("s_id", req.session_id);
  }

  next();
};
