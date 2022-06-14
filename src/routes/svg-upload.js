const express = require('express');
const multer = require('multer');
const { generateUniqueID } = require('../utils');

const uploadController = require('../controllers/svg-upload-controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, generateUniqueID(20) + file.originalname);
  },
});

const filterImage = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype === 'image/svg' || file.mimetype === 'image/svg+xml') {
    cb(null, true);
  } else cb(new Error('can only upload svg files'), false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: filterImage,
});

router.post('/upload-svg', upload.single('file'), uploadController.uploadSVG);

module.exports = router;
