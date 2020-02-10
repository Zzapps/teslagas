String.prototype.addQuery = function(obj) {
  return this + Object.keys(obj).reduce(function(p, e, i) {
    return p + (i == 0 ? "?" : "&") +
      (Array.isArray(obj[e]) ? obj[e].reduce(function(str, f, j) {
        return str + e + "=" + encodeURIComponent(f) + (j != obj[e].length - 1 ? "&" : "")
      },"") : e + "=" + encodeURIComponent(obj[e]));
  },"");
}


// Assumes n is a Number.
function isInt_ (n) {
  return n % 1 === 0
}

function isNumeric_ (val) {
  return Number(parseFloat(val)) === val
}

function base64EncodeSafe_ (string) {
  const encoded = Utilities.base64EncodeWebSafe(string)
  return encoded.replace(/=/g, '')
}

function fetchObject_ (url, options) {
  const response = UrlFetchApp.fetch(url, options)
  const responseObj = JSON.parse(response.getContentText())
  checkForError_(responseObj)
  return responseObj
}

function checkForError_ (responseObj) {
  if (responseObj['error']) {
    throw new Error(responseObj['error']['message'])
  }
  if (Array.isArray(responseObj) && responseObj.length && responseObj[0]['error']) {
    throw new Error(responseObj[0]['error']['message'])
  }
}

/**
 * Check if a value is of type Number but is NaN.
 *  This check prevents seeing non-numeric values as NaN.
 *
 * @param {value} the value to check
 * @returns {boolean} whether the given value is of type number and equal to NaN
 */
function isNumberNaN(value) {
  return typeof(value) == "number" && isNaN(value)
}
