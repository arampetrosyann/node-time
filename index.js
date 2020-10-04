const moment = require("moment");
const path = require("path");
const { Readable, Transform } = require("stream");
const { createWriteStream } = require("fs");

const writeTimePath = path.join(__dirname, "time.txt");

const readerStream = new Readable({
  encoding: "utf-8",
  read() {},
});

class Transformer extends Transform {
  _transform(data, enc, callback) {
    const normData = data.toString() + "\n";

    this.push(normData);

    callback();
  }
}

const transformer = new Transformer();

const writerStream = createWriteStream(writeTimePath);

readerStream.pipe(transformer).pipe(writerStream);

setInterval(() => {
  const currentTime = moment().format("LTS");

  readerStream.push(currentTime);
}, 1000);
