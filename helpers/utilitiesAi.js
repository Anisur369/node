// dependencies
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
  const filePath = path.join(lib.baseDir, dir, `${file}.json`);

  fs.mkdir(path.join(lib.baseDir, dir), { recursive: true }, (err) => {
    if (err) return callback(`Error creating directory: ${err}`);

    fs.open(filePath, 'wx', (err, fileDescriptor) => {
      if (err || !fileDescriptor) return callback(`Could not create new file, it may already exist: ${err}`);

      const stringData = JSON.stringify(data);

      fs.writeFile(fileDescriptor, stringData, (err2) => {
        if (err2) return callback(`Error writing to new file: ${err2}`);

        fs.close(fileDescriptor, (err3) => {
          if (err3) return callback(`Error closing new file: ${err3}`);
          callback(false);
        });
      });
    });
  });
};

// read data from file
lib.read = (dir, file, callback) => {
  const filePath = path.join(lib.baseDir, dir, `${file}.json`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err || !data) return callback(err, data);

    try {
      const parsedData = JSON.parse(data);
      callback(false, parsedData);
    } catch (parseErr) {
      callback(`Error parsing JSON: ${parseErr}`, null);
    }
  });
};

// update existing file
lib.update = (dir, file, data, callback) => {
  const filePath = path.join(lib.baseDir, dir, `${file}.json`);

  fs.open(filePath, 'r+', (err, fileDescriptor) => {
    if (err || !fileDescriptor) return callback(`Could not open file for updating, it may not exist yet: ${err}`);

    const stringData = JSON.stringify(data);

    fs.ftruncate(fileDescriptor, (err2) => {
      if (err2) return callback(`Error truncating file: ${err2}`);

      fs.writeFile(fileDescriptor, stringData, (err3) => {
        if (err3) return callback(`Error writing to file: ${err3}`);

        fs.close(fileDescriptor, (err4) => {
          if (err4) return callback(`Error closing file: ${err4}`);
          callback(false);
        });
      });
    });
  });
};

// delete a file
lib.delete = (dir, file, callback) => {
  const filePath = path.join(lib.baseDir, dir, `${file}.json`);

  fs.unlink(filePath, (err) => {
    if (err) return callback(`Error deleting file: ${err}`);
    callback(false);
  });
};

module.exports = lib;
