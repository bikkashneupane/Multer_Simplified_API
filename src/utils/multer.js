import multer from "multer";

//storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // destination folder
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date()}-${file.originalname}`); // unique path name
  },
});

//limits
const limits = {
  fieldSize: 10 * 1024 * 1024,
};

// export multer
const multerUpload = multer({ storage: multerStorage }, { limits });
export default multerUpload;
