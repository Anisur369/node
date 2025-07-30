const people = require('./z/people');
const _ = require('lodash');
const randomPerson = _.sample(people);
console.log(randomPerson);
console.log(_.last(people));
console.log(__dirname);
console.log(__filename);
