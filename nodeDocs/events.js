const School = require('./z/school.js');
const school = new School();

school.on('bellRing', (data) => {
  console.log('Event triggered:', data);
});

school.startPeriod();