const express = require('express');
const multer = require('multer');
const { generateUniqueID } = require('../utils');

const uploadController = require('../controllers/image-upload-controller');

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
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else cb(new Error('can only upload jpeg or png files'), false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500 * 1024 * 1024,
  },
  fileFilter: filterImage,
});

router.post(
  '/upload-single',
  upload.single('file'),
  uploadController.uploadImage
);

module.exports = router;
