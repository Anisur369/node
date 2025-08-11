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
  const protocol = typeof(requestProperties.body.protocol) == 'string' && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;
  const url = typeof(requestProperties.body.url) == 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;
  const method = typeof(requestProperties.body.method) == 'string' && ['get', 'post', 'put', 'delete'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;
  const successCodes = typeof(requestProperties.body.successCodes) == 'object' && requestProperties.body.successCodes instanceof Array && requestProperties.body.successCodes.length > 0 ? requestProperties.body.successCodes : false;
  const timeoutSeconds = typeof(requestProperties.body.timeoutSeconds) == 'number' && requestProperties.body.timeoutSeconds % 1 === 0 && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : false;
  if (protocol && url && method && successCodes && timeoutSeconds) {
    const token = typeof(requestProperties.headersObject.token) == 'string' ? requestProperties.headersObject.token : false;
    // lockup the user phone by reading the token
    handler._data.read('tokens', token, (err1, tokenData) => {
      if (!err1 && tokenData) {
        const userPhone = tokenData.phone;
        // lookup the user data
        handler._data.read('users', userPhone, (err2, userData) => {
          if (!err2 && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenIsValid) {
                const userObject = typeof(userData) == 'object' ? userData : {};
                const userChecks = typeof(userObject.checks) == 'object' && userObject.checks instanceof Array ? userObject.checks : [];
                if (userChecks.length < checksLimit) {
                  const checkId = helpers.createRandomString(20);
                  const checkObject = {
                    'id': checkId,
                    'userPhone': userPhone,
                    'protocol': protocol,
                    'url': url,
                    'method': method,
                    'successCodes': successCodes,
                    'timeoutSeconds': timeoutSeconds
                  }
                  handler._data.create('checks', checkId, checkObject, (err3) => {
                    if (!err3) {
                      // add the checkId to the user's checks
                      userChecks.push(checkId);
                      userObject.checks = userChecks;
                      handler._data.update('users', userPhone, userObject, (err4) => {
                        if (!err4) {
                          callback(200, checkObject);
                        } else {
                          callback(500, {'Error': 'Could not update the user with new check'});
                        }
                      });
                    } else {
                      callback(500, {'Error': 'Could not create the new check'});
                    }
                  })
                } else {
                  callback(500, {'Error': 'User has already reached their checks limit'});
                }
              } else {
                callback(403, {'Error': 'Invalid token'});
              }
            })
          } else {
            callback(500, {'Error': 'Could not find the user'});
          }
        });
      } else {
        callback(403, {'Error': 'Authentication failure'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required fields'});
  }
}
handler._check.get = (requestProperties, callback) => {
  const id = typeof(requestProperties.queryStringObject.id) == 'string' && requestProperties.queryStringObject.id.trim().length == 40 ? requestProperties.queryStringObject.id : false;
  if (id) {
    handler._data.read('checks', id, (err, checkData) => {
      if (!err && checkData) {
        const token = typeof(requestProperties.headersObject.token) == 'string' ? requestProperties.headersObject.token : false;
        // verify the token
        tokenHandler._token.verify(token, checkData.userPhone, (tokenIsValid) => {
          if (tokenIsValid) {
            callback(200, checkData);
          } else {
            callback(403, {'Error': 'Authentication failure'});
          }
        });
      } else {
        callback(404, {'Error': 'Check not found'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._check.put = (requestProperties, callback) => {
  const id = typeof(requestProperties.body.id) == 'string' && requestProperties.body.id.trim().length == 40 ? requestProperties.body.id : false;
  const protocol = typeof(requestProperties.body.protocol) == 'string' && ['http', 'https'].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;
  const url = typeof(requestProperties.body.url) == 'string' && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;
  const method = typeof(requestProperties.body.method) == 'string' && ['get', 'post', 'put', 'delete'].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;
  const successCodes = typeof(requestProperties.body.successCodes) == 'object' && requestProperties.body.successCodes instanceof Array && requestProperties.body.successCodes.length > 0 ? requestProperties.body.successCodes : false;
  const timeoutSeconds = typeof(requestProperties.body.timeoutSeconds) == 'number' && requestProperties.body.timeoutSeconds % 1 === 0 && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : false;
  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      handler._data.read('checks', id, (err, checkData) => {
        console.log(checkData);
        if (!err && checkData) {
          const token = typeof(requestProperties.headersObject.token) == 'string' ? requestProperties.headersObject.token : false;
          // verify the token
          tokenHandler._token.verify(token, checkData.userPhone, (tokenIsValid) => {
            if (tokenIsValid) {
              if (protocol) {
                checkData.protocol = protocol;
              }
              if (url) {
                checkData.url = url;
              }
              if (method) {
                checkData.method = method;
              }
              if (successCodes) {
                checkData.successCodes = successCodes;
              }
              if (timeoutSeconds) {
                checkData.timeoutSeconds = timeoutSeconds;
              }
              handler._data.update('checks', id, checkData, (err2) => {
                if (!err2) {
                  callback(200, checkData);
                } else {
                  callback(500, {'Error': 'Could not update the check'});
                }
              });
            } else {
              callback(403, {'Error': 'Authentication failure'});
            }
          });
        } else {
          callback(404, {'Error': 'Check not found'});
        }
      });
    } else {
      callback(400, {'Error': 'Missing fields to update'});
    }
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._check.delete = (requestProperties, callback) => {
  const id = typeof(requestProperties.queryStringObject.id) == 'string' && requestProperties.queryStringObject.id.trim().length == 40 ? requestProperties.queryStringObject.id : false;

  if (id) {
    // lookup the check
    handler._data.read('checks', id, (err, checkData) => {
      if (!err && checkData) {
        const token = typeof(requestProperties.headersObject.token) == 'string' ? requestProperties.headersObject.token : false;
        // verify the token
        const phone = checkData.userPhone;
        tokenHandler._token.verify(token, phone, (tokenIsValid) => {
          if (tokenIsValid) {
            // delete the check
            handler._data.delete('checks', id, (err2) => {
              if (!err2) {
                handler._data.read('users', phone, (err3, userData) => {
                  if (!err3 && userData) {
                    const userChecks = typeof(userData.checks) == 'object' && userData.checks instanceof Array ? userData.checks : [];
                    const checkPosition = userChecks.indexOf(id);
                    if (checkPosition > -1) {
                      userChecks.splice(checkPosition, 1);
                      // store the new checks
                      userData.checks = userChecks;
                      handler._data.update('users', phone, userData, (err4) => {
                        if (!err4) {
                          callback(200, {'message': 'Check deleted'});
                        } else {
                          callback(500, {'Error': 'Could not update the user'});
                        }
                      });
                    } else {
                      callback(500, {'Error': 'Could not update the user'});
                    }
                  } else {
                    callback(500, {'Error': 'Could not find the user'});
                  }
                });
              } else {
                callback(500, {'Error': 'Could not delete the check'});
              }
            });
          } else {
            callback(403, {'Error': 'Authentication failure'});
          }
        });
      } else {
        callback(404, {'Error': 'Check not found'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}

module.exports = handler;