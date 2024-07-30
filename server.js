import morgan from "morgan";
import express from "express";
import cors from "cors";
import multerUpload from "./src/utils/multer.js";
import filePath from "path";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const _dirname = filePath.resolve();
app.use(express.static(filePath.join(_dirname, "public/images")));

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
          const filePath = file.path.replace("public", "");
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
app.listen(8000, (error) =>
  error ? console.log(error) : console.log("Server Alive")
);
