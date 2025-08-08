// crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');

const config = {};

config.hashingSecret = 'thisIsSecret';

config.tokenExpiration = 60 * 60; // 1 hour in seconds
config.checksLimit = 5; // Maximum number of checks a user can have

module.exports = config;
