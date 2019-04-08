// "http://localhost:8080/stories/bobs-story/"

/**
 * Returns the parsed slug from a given url.
 * NOTE: This function does not check for any slug mapping.
 * @param {string} url
 */
const getSlug = (url, offset = 1) => {
  const parts = url.split('/').filter(part => part !== '');
  console.log('Parts', parts);

  if (parts.length >= offset) {
    return parts.slice(parts.length - offset).join('/');
  }

  return url;
};


console.log(getSlug("http://localhost:8080/stories/bobs-story/"));
console.log(getSlug("http://localhost:8080/who-we-are/leadership/"));
console.log(getSlug("http://localhost:8080/about/"));