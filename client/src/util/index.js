const buildHandleEnterKeyPress = (onClick) => (e) => {
  if (e.key === 'Enter') {
    onClick(e);
  }
};

// Arrow key presses cannot be detected by onKeyPress.
// Instead, they are detected by onKeyDown.
const buildHandleKeyDown = (onClick, keys = []) => (e) => {
  keys.forEach((key) => {
    if (e.key === key) {
      onClick(e);
    }
  });
};

// *** setCookie function instructions ***
// 'cName' is the desired name of the cookie (something short and descriptive)
// 'cValue' is the value your storing in the cookie.
//    Can be any value (string, array, obj, etc). Will be stringified for you.
// expDays is when cookie will expire as number of days from when the cookie is set.
// setCookie can also be used to update a cookie - make sure to pass in the same name.
const setCookie = ((cName, cValue, expDays = 365) => {
  const cValueJSON = JSON.stringify(cValue);
  const date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cName}=${cValueJSON}; ${expires}; path=/`;
});

const deleteCookie = ((cName) => {
  const date = new Date();
  date.setTime(date.getTime() - 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${cName}=; ${expires}; path=/`;
});

const getCookie = ((cName) => {
  const parsedCookies = document.cookie.split(';').reduce((cookies, cookie) => {
    const cookieObj = cookies;
    if (cookie.length) {
      const index = cookie.indexOf('=');
      const name = cookie.slice(0, index).trim();
      const value = cookie.slice(index + 1).trim();
      cookieObj[name] = value;
    }
    return cookieObj;
  }, {});

  if (parsedCookies[cName]) {
    try {
      // try block intended to catch case where value would parse to a string.
      return JSON.parse(parsedCookies[cName]);
    } catch {
      // if error, value should be a string, so return a string.
      return parsedCookies[cName];
    }
  }
  return undefined;
});

const formatImg = (url, w, h) => {
  // this function works specifically for unsplash urls only
  // extract base url
  let newUrl = url.match(/https:\/\/.*ixid=\w+/) || url.match(/https:\/\/.*ixlib=[^&]+/);
  if (!newUrl) {
    return url; // return original url if match cannot be found
  }
  newUrl += '&auto=format,enhance';
  // if w is less than 100px, zoom in on faces by default, otherwise fit by crop
  newUrl += w < 100 ? '&fit=facearea&facepad=4' : '&fit=crop';
  newUrl += w ? `&w=${w}` : '';
  newUrl += h ? `&h=${h}` : '';
  return newUrl;
};

export {
  buildHandleEnterKeyPress,
  buildHandleKeyDown,
  setCookie,
  deleteCookie,
  getCookie,
  formatImg,
};
