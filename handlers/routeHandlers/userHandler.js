/*
*Title: User Handler
*Description: Route handler to user related routes
*Author: Anisur Rahman 
*Date: 19-06-2021
*/

// dependencies
const data = require('../../lib/data');
const helpers = require('../../helpers/utilities');
const tokenHandler = require('./tokenHandler');


// module scaffolding
const handler = {}
handler._data = data;

handler._users = {};
handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ['get', 'post', 'put', 'delete'];
  if (acceptedMethods.indexOf(requestProperties.method) > -1) { 
    handler._users[requestProperties.method](requestProperties, callback); 
  }else{
    callback(405);
  }
}

handler._users.post = (requestProperties, callback) => {
  const firstName = typeof(requestProperties.body.firstName) == 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
  const lastName = typeof(requestProperties.body.lastName) == 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
  const phone = typeof(requestProperties.body.phone) == 'string' && requestProperties.body.phone.trim().length == 10 ? requestProperties.body.phone : false;
  const password = typeof(requestProperties.body.password) == 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
  const tosAgreement = typeof(requestProperties.body.tosAgreement) == 'boolean' && requestProperties.body.tosAgreement == true ? true : false;
  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that user doesn't already exist
    handler._data.read('users', phone, (err, data) => {
      if (err) {
        // hash the password
        const userObject = {
          'firstName': firstName,
          'lastName': lastName,
          'phone': phone,
          'password': helpers.hash(password),
          'tosAgreement': true
        };
        handler._data.create('users', phone, userObject, (err2) => {
          if (!err2) {
            callback(200, {'message': 'User was created'});
          } else {
            callback(500, {'Error': 'Could not create user'});
          }
        });
      } else {
        callback(500, {'Error': 'User already exists'});
      }
    })
  } else {
    callback(400, {'Error': 'Missing required fields'});
  }
}
handler._users.get = (requestProperties, callback) => {
  // check the phone number
  const phone = typeof(requestProperties.queryStringObject.phone) == 'string' && requestProperties.queryStringObject.phone.trim().length == 10 ? requestProperties.queryStringObject.phone : false;
  if (phone) {
    // verify token
    let token = typeof(requestProperties.headersObject.token) == 'string' ? requestProperties.headersObject.token : false;
    tokenHandler._token.verify(token, phone, (tokenIsValid) => {
      if (tokenIsValid) {
        handler._data.read('users', phone, (err, data) => {
          const user={...data};
          if (!err && user) {
            delete user.password;
            callback(200, user);
          } else {
            callback(404, {'Error': 'User not found'});
          }
        });
      } else {
        callback(403, {'Error': 'Authentication failure'});
      }
    })
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._users.put = (requestProperties, callback) => {
  const phone = typeof(requestProperties.body.phone) == 'string' && requestProperties.body.phone.trim().length == 10 ? requestProperties.body.phone : false;
  const firstName = typeof(requestProperties.body.firstName) == 'string' && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;
  const lastName = typeof(requestProperties.body.lastName) == 'string' && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;
  const password = typeof(requestProperties.body.password) == 'string' && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;
  if (phone) {
    if (firstName || lastName || password) {
      // verify token
      let token = typeof(requestProperties.headersObject.token) == 'string' ? requestProperties.headersObject.token : false;
      tokenHandler._token.verify(token, phone, (tokenIsValid) => {
        if (tokenIsValid) {
          handler._data.read('users', phone, (err, userData) => {
            if (!err && userData) {
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.password = helpers.hash(password);
              }
              handler._data.update('users', phone, userData, (err2) => {
                if (!err2) {
                  callback(200, {'message': 'User updated'});
                } else {
                  callback(500, {'Error': 'Could not update user'});
                }
              });
            } else {
              callback(400, {'Error': 'User not found'});
            }
          });
        } else {
          callback(403, {'Error': 'Authentication failure'});
        }
      })
    } else {
      callback(400, {'Error': 'Missing fields to update'});
    }
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}
handler._users.delete = (requestProperties, callback) => {
  // check the phone number
  const phone = typeof(requestProperties.queryStringObject.phone) == 'string' && requestProperties.queryStringObject.phone.trim().length == 10 ? requestProperties.queryStringObject.phone : false;
  if (phone) {
    // verify token
    let token = typeof(requestProperties.headersObject.token) == 'string' ? requestProperties.headersObject.token : false;
    tokenHandler._token.verify(token, phone, (tokenIsValid) => {
      if (tokenIsValid) {
        handler._data.delete('users', phone, (err) => {
          if (!err) {
            callback(200, {'message': 'User deleted'});
          } else {
            callback(500, {'Error': 'Could not delete user'});
          }
        });
      } else {
        callback(403, {'Error': 'Authentication failure'});
      }
    })
  } else {
    callback(400, {'Error': 'Missing required field'});
  }
}

module.exports = handler;