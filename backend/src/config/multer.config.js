const multer = require("multer");

const config = require("./var.config");


// Used to determine which type of files to accept
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// Configuring filename and destination
const avatar = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }

    cb(error, `${config.uploadsFolder}/avatars`);
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split()
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

module.exports = {
  avatar
}
// module.exports = multer({ storage:storage }).single("img");
