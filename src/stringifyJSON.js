// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


var stringifyJSON = function(obj) {
  var arrOfKeyVals = [],
    arrVals = [],
    objKeys = [];
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null)
    return '' + obj;
  else if (typeof obj === 'string')
    return '"' + obj + '"';
  else if (Array.isArray(obj)) {
    if (obj[0] === undefined)
      return '[]';
    else {
      obj.forEach(function(el) {
        arrVals.push(stringifyJSON(el));
      });
      return '[' + arrVals + ']';
    }
  }
  else if (obj instanceof Object) {
    objKeys = Object.keys(obj);
    objKeys.forEach(function(key) {
      var keyOut = '"' + key + '":';
      var keyValOut = obj[key];
      if (keyValOut instanceof Function || typeof keyValOut === undefined)
        arrOfKeyVals.push('');
      else if (typeof keyValOut === 'string')
        arrOfKeyVals.push(keyOut + '"' + keyValOut + '"');
      else if (typeof keyValOut === 'boolean' || typeof keValOut === 'number' || keyValOut === null)
        arrOfKeyVals.push(keyOut + keyValOut);
      else if (keyValOut instanceof Object) {
        arrOfKeyVals.push(keyOut + stringifyJSON(keyValOut));
      }
    });
    return '{' + arrOfKeyVals + '}';
  }
};
