/*
*Title: Routes
*Description: Application Routes
*Author: Anisur Rahman 
*Date: 19-06-2021
*/
// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');
const { userHandler } = require('./handlers/routeHandlers/userHandler');
const { tokenHandler } = require('./handlers/routeHandlers/tokenHandler');
// const { checkHandler } = require('./handlers/routeHandlers/checkHandler2');
const { checkHandler } = require('./handlers/routeHandlers/checkHandler2');



const Routes = {
  "":sampleHandler,
  sample:sampleHandler,
  user:userHandler,
  token:tokenHandler,
  check:checkHandler
}


module.exports = Routes;