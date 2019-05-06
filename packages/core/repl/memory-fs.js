const MemoryFileSystem = require('memory-fs');
const fs = new MemoryFileSystem();
for (let f in MemoryFileSystem.prototype) {
  if (typeof MemoryFileSystem.prototype[f] === 'function') {
    fs[f] = MemoryFileSystem.prototype[f].bind(fs);
  }
}
fs.lstat = fs.stat;
fs.lstatSync = fs.statSync;

const readFileSync = fs.readFileSync;
fs.readFileSync = (path, encoding) => {
  if (encoding && encoding.encoding) encoding = encoding.encoding;
  return readFileSync(path, encoding);
};

const createWriteStream = fs.createWriteStream;
fs.createWriteStream = path => {
  const s = createWriteStream(path);
  return {
    bytesWritten: 0,
    write(data, cb) {
      this.bytesWritten += data.length;
      return s.write(data, cb);
    },
    end(cb) {
      return s.end(cb);
    }
  };
};
module.exports = fs;
