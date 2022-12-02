var fs = require('fs');

async function uploadImage(req, res) {
  const { file } = req;

  let downloadURL;

  if (process.env.NODE_ENV === 'development') {
    downloadURL = `${'127.0.0.1:3000'}/${file.path}`;
  } else downloadURL = `${'http://54.163.214.5'}/${file.path}`;

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
