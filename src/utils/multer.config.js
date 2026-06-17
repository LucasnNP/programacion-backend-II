import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const newFilename = `${Date.now()}-${file.originalname}`;
    cb(null, newFilename);
  },
});

const uploaderMulter = multer({ storage });

export default uploaderMulter;
