/*
*Title: Routes
*Description: Application Routes
*Author: Anisur Rahman 
*Date: 19-06-2021
*/
// dependencies
const { sampleHandler } = require('./handlers/routeHandlers/sampleHandler');

const Routes = {
  "":sampleHandler,
  sample:sampleHandler,
}


module.exports = Routes;