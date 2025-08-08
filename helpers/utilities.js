/*
*Title: Utilities
*Description: Important utility functions
*Author: Anisur Rahman 
*Date: 19-06-2021
*/

//dependencies;
const crypto = require('crypto');
const config = require('./config');


// app object -module scafolding
const utilities = {};

// parse JSON string to Object
utilities.parseJSON = (string) => {
  let output;
  try {
    output = JSON.parse(string);
    return output;
  } catch (e) {
    output = {};
  }
  return output;
}
utilities.hash = (str) => {
  if (typeof(str) == 'string' && str.length > 0) {
    return crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
  } else {
    return false;
  }
}

utilities.createRandomString = (strLength) => {
  let length = strLength;
  length = typeof(strLength) === 'number' && strLength > 0 ? strLength : false;
  
  if (length) {
    return crypto.randomBytes(length).toString('hex');
  } else {
    return false;
  }
}



// export module
module.exports = utilities;