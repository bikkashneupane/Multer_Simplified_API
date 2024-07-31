import morgan from "morgan";
import express from "express";
import cors from "cors";
import multerUpload from "./src/utils/multer.js";
import filePath from "path";
import fs from "fs";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const __dirname = filePath.resolve();
console.log(filePath.join(__dirname, "public/images"));
app.use(express.static(filePath.join(__dirname, "public/images")));

// upload images
app.post(
  "/api/v1/upload-image",
  multerUpload.array("images", 5),
  (req, res) => {
    try {
      console.log(req.body);
      console.log(req.files);

      // generate image urls from express server
      if (req.files.length > 0) {
        const imgeUrls = req.files.map((file) => {
          console.log(file);
          const filePath = file.path.replace("public/images", "");
          return filePath;
        });

        return res.json({
          status: "success",
          message: "Image Upload Success",
          imgeUrls,
        });
      }

      res.json({
        status: "error",
        message: "Something didn't add up",
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }
);

// remove images from express server
app.delete("/api/v1/delete-images", (req, res) => {
  try {
    const { imagePath } = req.body;

    // delete images
    if (imagePath?.length > 0) {
      imagePath.forEach((item) => {
        fs.unlinkSync(filePath.join("public/images", item), (error) => {
          return res.status(400).json({
            status: "error",
            message: "Invalid or missing imagePath",
          });
        });
      });
    }
    res.json({
      status: "success",
      message: "Images Deleted",
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error,
    });
  }
});

app.listen(8000, (error) =>
  error ? console.log(error) : console.log("Server Alive")
);
