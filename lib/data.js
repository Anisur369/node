//dependencies
const fs = require('fs');
const path = require('path');

const lib = {};


// base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

//write data to file
lib.create = (dir, file, data, callback) => {
  fs.mkdir(lib.baseDir + dir, { recursive: true }, (err) => {
    if(!err) {
    //open file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', (err, fileDescriptor) => {
      if(!err && fileDescriptor) {
        //convert data to string
        const stringData = JSON.stringify(data);
        //write to file and close it
        fs.writeFile(fileDescriptor, stringData, (err2) => {
          if(!err2) {
            fs.close(fileDescriptor, (err3) => {
              if(!err3) {
                callback(false);
              } else {
                callback('Error closing new file');
              }
            });
          } else {
            callback('Error writing to new file');
          }
        });
      } else {
        callback('Could not create new file, it may already exist'+ err);
      }
    });

    } else {
      callback('Error creating directory:'+err);
    }
  })
};

module.exports = lib;