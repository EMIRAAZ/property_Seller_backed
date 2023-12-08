async function uploadSVG(req, res) {
  const { file } = req;

  let downloadURL;

  if (process.env.NODE_ENV === 'development') {
    downloadURL = `${'127.0.0.1:3000'}/${file.path}`;
  } else downloadURL = `${'https://www.propertyseller.ae'}/${file.path}`;

  return res.status(201).json({
    status: 201,
    message: 'SVG uploaded successfully',
    data: downloadURL,
  });
}

module.exports = {
  uploadSVG: [uploadSVG],
};
