const URL_REGEX = new RegExp(
  '^(https?:\\/\\/)?' // protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
  + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
  + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
  + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
  + '(\\#[-a-z\\d_]*)?$',
  'i',
); // fragment locator

export function isValidUrl(url) {
  return URL_REGEX.test(url);
}

export function isValidFacebookUrl(url) {
  return isValidUrl(url) && url.toLowerCase().includes('facebook');
}
