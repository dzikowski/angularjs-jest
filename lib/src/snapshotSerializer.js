import { minify } from 'html-minifier';

const minifyHtml = (html) => {
  const config = {
    collapseWhitespace: true,
    removeComments: true,
  };
  return minify(html, config);
};

/* global document:true */
const createElementFromHTML = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

export default {
  test(value) {
    return typeof value.html === 'function';
  },
  print(value, serialize) {
    const minified = minifyHtml(value.html());
    const element = createElementFromHTML(minified);
    return serialize(element);
  },
};
