import multer from "multer";
import path from "path";

const storage = multer.memoryStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;
