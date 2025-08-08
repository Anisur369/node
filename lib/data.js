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
// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', (err, data) => {
    if(!err && data) {
      const parsedData = JSON.parse(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  });
};
// update existing file
lib.update = (dir, file, data, callback) => {
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', (err, fileDescriptor) => {
    if(!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, (err2) => {
        if(!err2) {
          fs.writeFile(fileDescriptor, stringData, (err3) => {
            if(!err3) {
              fs.close(fileDescriptor, (err4) => {
                if(!err4) {
                  callback(false);
                } else {
                  callback('Error closing file');
                }
              });
            } else {
              callback('Error writing to file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open file for updating, it may not exist yet');
    }
  });
};
// delete a file
lib.delete = (dir, file, callback) => {
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', (err) => {
    if(!err) {
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};

module.exports = lib;