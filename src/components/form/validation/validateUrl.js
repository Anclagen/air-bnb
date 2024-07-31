//quickly check if the url is valid, might not check its an image though
export function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
