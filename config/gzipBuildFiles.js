const streamToPromise = require('stream-to-promise');
const imageExtensions = require('image-extensions');
const util = require('util');
const zlib = require('zlib');
const path = require('path');
const glob = require('glob');
const fs = require('fs');

const unlinkAsync = util.promisify(fs.unlink);
const BUILD_FOLDER = path.join(process.cwd(), 'build');

module.exports = async () => {
  const files = glob.sync('**/*', {
    cwd: BUILD_FOLDER,
    mark: true,
    stat: true,
    ignore: [
      '**/*/',
      'images/**/*',
      '**/*.gz',
      ...imageExtensions.map(ext => `**/*.${ext}`)
    ]
  });

  for (let file of files) {
    const pathname = path.join(BUILD_FOLDER, file);
    const gzPathname = path.join(BUILD_FOLDER, `${file}.gz`);

    if (fs.existsSync(gzPathname)) {
      await unlinkAsync(gzPathname);
    }

    const gzip = zlib.createGzip();
    const ipt = fs.createReadStream(pathname);
    const out = fs.createWriteStream(gzPathname);

    await streamToPromise(ipt.pipe(gzip).pipe(out));
  }
};
