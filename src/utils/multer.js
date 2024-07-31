import multer from "multer";

// storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // destination folder path
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date()}-${file.originalname}`); // unique path name
  },
});

// limits
const limits = {
  fieldSize: 10 * 1024 * 1024,
};

// filters
const multerFilters = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png"];

  if (allowedMimeTypes.includes(file.mimetype)) {
    // file type is acceptable
    cb(null, true);
  } else {
    const err = new Error("Invalid file type, Only JPWG and PNG allowed.");
    cb(err, false);
  }
};

// export multer
const multerUpload = multer({
  storage: multerStorage,
  limits,
  fileFilter: multerFilters,
});
export default multerUpload;
