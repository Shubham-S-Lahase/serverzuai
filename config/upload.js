const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      const formats = ["jpg", "jpeg", "png", "webp"];
      const ext = path.extname(file.originalname).toLowerCase().substring(1);
      return formats.includes(ext) ? ext : "jpg";
    },
    public_id: (req, file) => Date.now(),
  },
});

const upload = multer({ storage });

module.exports = upload;
