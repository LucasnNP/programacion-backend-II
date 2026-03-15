import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    next(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const newFilename = `${Date.now()}-${file.originalname}`;
    next(null, newFilename);
  },
});

const uploaderMulter = multer({ storage });

export default uploaderMulter;
