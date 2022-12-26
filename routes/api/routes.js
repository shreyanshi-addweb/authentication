const express = require('express');
const router = express.Router();
const API = require('../../controllers/api');
const multer = require('multer');
// const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb)  {
        // cb(null, path.join(__dirname, '../uploads'));
        cb(null,'/home/addweb/authentication/uploads');
    },
    filename: function (req,file,cb)  {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
      },
      fileFilter: fileFilter
}).single("image");

// router.get(("/"), API.fetchAll );
router.get(("/:id"), API.fetchById );
router.get(("/"), API.fetchByCategory);
router.post(("/"), upload, API.createPost );
router.patch(("/:id"),upload, API.updatePost );
router.delete(("/:id"), API.deletePost);




module.exports = router;