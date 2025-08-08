/*
*Title: token Handler
*Description: Route handler to token related routes
*Author: Anisur Rahman 
*Date: 19-06-2021
*/


// dependencies
const data = require('../../lib/data');
const helpers = require('../../helpers/utilities');
// const tokenHandler = require('./tokenHandler');

// module scaffolding
const handler = {}
handler._data = data;

handler._token = {};
handler.tokenHandler = (requestProperties, callback) => {
  
  const acceptedMethods = ['get', 'post', 'put', 'delete'];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) { 
    handler._token[requestProperties.method](requestProperties, callback); 
  }else{
    callback(405);
  }
}

handler._token.post = (requestProperties, callback) => {
  const phone = typeof(requestProperties.body.phone) == 'string' && requestProperties.body.phone.trim().length == 10 ? requestProperties.body.phone : false;
  const password = typeof(requestProperties.body.password) == 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
  if (phone && password) {
    handler._data.read('users', phone, (err, userData) => {
      if (!err && userData) {
        const hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.password) {
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + (1000 * 60 * 60)*24;
          const tokenObject = {
            'phone': phone,
            'id': tokenId,
            'expires': expires
          }
          handler._data.create('tokens', tokenId, tokenObject, (err2) => {
            if (!err2) {
              callback(200, tokenObject);
            } else {
              callback(500, {'Error': 'Could not create token'});
            }
          });
        } else {
          callback(400, {'Error': 'Password did not match'});
        }
      } else {
        callback(400, {'Error': 'User not found'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._token.get = (requestProperties, callback) => {
  const id = typeof(requestProperties.queryStringObject.id) == 'string' && requestProperties.queryStringObject.id.trim().length == 40 ? requestProperties.queryStringObject.id : false;
  if (id) {
    handler._data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404, {'Error': 'Token not found'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._token.put = (requestProperties, callback) => {
  const id = typeof(requestProperties.body.id) == 'string' && requestProperties.body.id.trim().length == 40 ? requestProperties.body.id : false;
  const extend = typeof(requestProperties.body.extend) == 'boolean' && requestProperties.body.extend == true ? true : false;
  if (id && extend) {
    handler._data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        if (tokenData.expires > Date.now()) {
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          handler._data.update('tokens', id, tokenData, (err2) => {
            if (!err2) {
              callback(200, tokenData);
            } else {
              callback(500, {'Error': 'Could not update token'});
            }
          });
        } else {
          callback(400, {'Error': 'Token has already expired'});
        }
      } else {
        callback(400, {'Error': 'Token not found'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._token.delete = (requestProperties, callback) => {
  const id = typeof(requestProperties.queryStringObject.id) == 'string' && requestProperties.queryStringObject.id.trim().length == 40 ? requestProperties.queryStringObject.id : false;
  if (id) {
    handler._data.read('tokens', id, (err, tokenData) => {
      if (!err && tokenData) {
        handler._data.delete('tokens', id, (err2) => {
          if (!err2) {
            callback(200, {'message': 'Token deleted'});
          } else {
            callback(500, {'Error': 'Could not delete token'});
          }
        });
      } else {
        callback(400, {'Error': 'Token not found'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._token.verify = (id, phone, callback) => {
  handler._data.read('tokens', id, (err, tokenData) => {
    if (!err && tokenData) {
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
}

module.exports = handler;