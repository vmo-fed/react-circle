function isArray(data) {
  return Object.prototype.toString.call(data) === "[object Array]";
}

function isString(data) {
  return Object.prototype.toString.call(data) === "[object String]";
}

export default {
  isArray,
  isString
};
