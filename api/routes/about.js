const express = require('express')
const about = require('../controller/about')
const auth = require('../middleware/auth')
const { aboutValidation, schemaValidation } = require('../validation/about')
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./upload");
    },
  
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"||
        file.mimetype == "image/PNG" ||
        file.mimetype == "image/JPG" ||
        file.mimetype == "image/JPEG"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
      }
    },
  }).single('image');

router.get('/api/v1/about',about.getAbout)
router.get('/api/v1/about/:_id',auth,about.getAboutById)
router.post('/api/v1/about',upload, aboutValidation(),schemaValidation,about.postAbout)
router.put('/api/v1/about/:_id',upload,auth,about.putAbout)
router.delete('/api/v1/about/:_id',auth,about.deleteAbout)

module.exports = router