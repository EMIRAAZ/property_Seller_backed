var fs = require('fs');
var sharp = require('sharp');
const path = require('path');

async function uploadImage(req, res) {
  const { file } = req;

  const { filename: image } = req.file;

  await sharp(req.file.path)
    .resize({ height: 1000 })
    .webp({ quality: 60 })
    .toFile(path.resolve(req.file.destination, 'processed', image));
  fs.unlinkSync(req.file.path);

  let downloadURL;
  // console.log(file.filename,'fileee');

  // console.log(req.hostname)

  if (process.env.NODE_ENV === 'development') {
    downloadURL = `/processed/${file.filename}`;
  } else
    downloadURL = `/processed/${file.filename}`;

  return res.status(201).json({
    status: 201,
    message: 'Image uploaded successfully',
    data: downloadURL,
  });
}

async function deleteImage(req, res) {
  const { id } = req.params;
  console.log(id);

  fs.stat(`./uploads/${id}`, function (err, stats) {
    console.log(stats);

    if (err) {
      return res.status(400).send({
        message: 'No file exist',
      });
    }

    fs.unlink(`./uploads/${id}`, function (err) {
      if (err) {
        return res.status(400).send({
          message: 'Cannot do the operation',
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Successfully deleted Image',
      });
    });
  });
}

module.exports = {
  uploadImage: [uploadImage],
  deleteImage: [deleteImage],
};
