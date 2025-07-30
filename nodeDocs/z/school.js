// // module1 started
// const EventEmitter = require('events');
// const emitter = new EventEmitter();

// function startPeriod() {
//   console.log('Class started');
//   setTimeout(() => {
//     emitter.emit('bellRing', { text: 'Class is over ended' });
//   }, 3000);
// }
// module.exports = { startPeriod, emitter };
// // module1 ended


const EventEmitter = require('events');

class School extends EventEmitter {
  startPeriod() {
    console.log('Class started');
    setTimeout(() => {
      this.emit('bellRing', { text: 'Class is over ended' });
    }, 3000);
  }
}

module.exports = School
