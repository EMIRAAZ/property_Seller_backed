async function uploadImage(req, res) {
  const { file } = req;

  const downloadURL = `${'127.0.0.1:3000'}/${file.path}`;

  return res.status(201).json({
    status: 201,
    message: 'Image uploaded successfully',
    data: downloadURL,
  });
}

module.exports = {
  uploadImage: [uploadImage],
};
