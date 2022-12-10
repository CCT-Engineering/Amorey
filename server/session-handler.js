const { v4: uuidv4 } = require('uuid');

module.exports = (req, res, next) => {
  /**
   *
   * Parse cookies in incoming request:
   *
   */

  // req.get('Cookie') looks at Cookie header rcvd from the client.
  const cookieString = req.get('Cookie') || '';

  // there could be many cookies stored on the client. We need to find ours...
  const parsedCookies = cookieString.split('; ').reduce((cookies, cookie) => {
    const modCookies = cookies;
    if (modCookies.length) {
      const index = cookie.indexOf('=');
      const key = cookie.slice(0, index);
      const token = cookie.slice(index + 1);
      modCookies[key] = token;
    }
    return modCookies;
  }, {});

  if (parsedCookies.amorey_id) {
    // if amorey session id exists on cookie header rcvd from client, store it on the req obj
    req.session_id = parsedCookies.amorey_id;
  } else {
    // otherwise, create a new session id, save on req obj...
    req.session_id = uuidv4();
    // ...and set the new cookie on the response object so that it get saved on client.
    res.cookie('amorey_id', req.session_id);
  }

  next();
};
