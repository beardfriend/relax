export function splitCookie(cookie: string) {
  const cooked = [];

  if (cookie.includes(';')) {
    const splitedCookie = cookie.split('; ');
    for (let i = 0; i < splitedCookie.length; i += 1) {
      const keys = splitedCookie[i].split('=')[0];
      const value = splitedCookie[i].split('=')[1];
      cooked.push({ [keys]: value });
    }
  } else {
    const splitedCookies = cookie.split('=');
    cooked.push({ [splitedCookies[0]]: splitedCookies[1] });
  }
  return cooked;
}

export function findCookieValue(array: { [key: string]: string }[], keyname: string) {
  const findCookie = array.find((data) => Object.keys(data).includes(keyname));
  if (findCookie === undefined) {
    return undefined;
  }
  return findCookie[keyname] as string;
}
