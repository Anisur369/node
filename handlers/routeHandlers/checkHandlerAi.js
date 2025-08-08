/*
*Title: Check Handler
*Description: Route handler to check related routes
*Author: Anisur Rahman
*Date: 09-06-2025
*/

// dependencies
const data = require('../../lib/data');
const { checksLimit } = require('../../helpers/config');
const helpers = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');



// module scaffolding
const handler = {}
handler._data = data;


handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ['get', 'post', 'put', 'delete'];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) { 
    handler._check[requestProperties.method](requestProperties, callback); 
  }else{
    callback(405);
  }
}

handler._check = {};

handler._check.post = (requestProperties, callback) => {
  const { protocol, url, method, successCodes, timeoutSeconds } = requestProperties.body;

  const validProtocol = typeof protocol === 'string' && ['http', 'https'].includes(protocol);
  const validUrl = typeof url === 'string' && url.trim().length > 0;
  const validMethod = typeof method === 'string' && ['get', 'post', 'put', 'delete'].includes(method);
  const validSuccessCodes = Array.isArray(successCodes) && successCodes.length > 0;
  const validTimeout = typeof timeoutSeconds === 'number' && Number.isInteger(timeoutSeconds) && timeoutSeconds >= 1 && timeoutSeconds <= 5;

  if (validProtocol && validUrl && validMethod && validSuccessCodes && validTimeout) {
    const token = typeof requestProperties.headersObject.token === 'string' ? requestProperties.headersObject.token : false;

    handler._data.read('tokens', token, (err1, tokenData) => {
      if (err1 || !tokenData) return callback(403, { Error: 'Authentication failure' });

      const userPhone = tokenData.phone;

      handler._data.read('users', userPhone, (err2, userData) => {
        if (err2 || !userData) return callback(500, { Error: 'Could not find the user' });

        tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
          if (!tokenIsValid) return callback(403, { Error: 'Invalid token' });

          const userChecks = Array.isArray(userData.checks) ? userData.checks : [];

          if (userChecks.length >= checksLimit) {
            return callback(400, { Error: 'User has reached the maximum number of checks' });
          }

          const checkId = helpers.createRandomString(20);
          const checkObject = {
            id: checkId,
            userPhone,
            protocol,
            url,
            method,
            successCodes,
            timeoutSeconds
          };

          handler._data.create('checks', checkId, checkObject, (err3) => {
            if (err3) return callback(500, { Error: 'Could not create the new check' });

            userChecks.push(checkId);
            userData.checks = userChecks;

            handler._data.update('users', userPhone, userData, (err4) => {
              if (err4) return callback(500, { Error: 'Could not update user with new check' });

              callback(200, checkObject);
            });
          });
        });
      });
    });
  } else {
    callback(400, { Error: 'Missing or invalid required fields' });
  }
};

handler._check.get = (requestProperties, callback) => {}
handler._check.put = (requestProperties, callback) => {}
handler._check.delete = (requestProperties, callback) => {}

module.exports = handler;