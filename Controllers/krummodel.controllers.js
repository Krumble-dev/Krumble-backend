import dotenv from 'dotenv';

import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import CatchAsync from "../utils/CatchAsync.js";

import KrumModel from '../Models/KrumModel.js';
import { Storage } from "@google-cloud/storage";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const keyPath = path.join(__dirname, "key.json");

// if (!fs.existsSync(keyPath)) {
//   console.error(`Key.json not found at path: ${keyPath}`);
//   throw new Error(`Key.json is missing. Please ensure it is available at: ${keyPath}`);
// }

// process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;
const storage = new Storage({
  projectId:"omega-healer-448021-v9",
  keyFilename:"Key.json"
}
);
const bucketName = "krumble";



export const uploadKrumModel = CatchAsync(async (req, res, next) => {
  
  if (!req.files || !req.files.imagefile || !req.files.modelfile|| !req.body.name || !req.body.description) {
    return next(new ApiError(400, "Please provide all the required fields"));
  }

  const { name, description } = req.body;
  // console.log(req.files);
  const imagefile = req.files.imagefile[0];
  const modelfile = req.files.modelfile[0];
  const imgfileName = `${Date.now()}-${imagefile.originalname.replace(/ /g, "_")}`;
  const modelfileName = `${Date.now()}-${modelfile.originalname.replace(/ /g, "_")}`;
  const bucket = storage.bucket(bucketName);
  const imgfile = bucket.file(imgfileName);

  const stream = imgfile.createWriteStream({
    metadata: { contentType: req.files.imagefile.mimetype },
  });

  stream.on('error', (err) => {
    console.error("File upload error:", err);
    return next(new ApiError(500, `File upload failed: ${err.message}`));
  });

  stream.on('finish', async () => {
    try {
      const publicImgUrl = `https://storage.googleapis.com/${bucketName}/${imgfileName}`;

      const modelFileObj = bucket.file(modelfileName);
      const modelStream = modelFileObj.createWriteStream({ metadata: { contentType: req.files.modelfile.mimetype } });

      modelStream.on("error", (err) => next(new ApiError(500, `Model file upload failed: ${err.message}`)));

      modelStream.on("finish", async () => {
        try {
          const publicModelUrl = `https://storage.googleapis.com/${bucketName}/${modelfileName}`;

          // Save to database
          const ModelUploaded = await KrumModel.create({
            name,
            description,
            ImageURL: publicImgUrl,
            ModelURL: publicModelUrl,
          });

          return res.status(201).json(new ApiResponse(201, { message: "Model uploaded!", model: ModelUploaded }));
        } catch (error) {
          return next(new ApiError(500, "Database save failed"));
        }
      });

      modelStream.end(req.files.modelfile.buffer);
    } catch (error) {
      return next(new ApiError(500, "Database save failed"));
    }
  });

  stream.end(req.files.imagefile.buffer);
});



export const getKrumModels = CatchAsync(async (req, res, next) => {
    const models = await KrumModel.find();
    return res.status(200).json(new ApiResponse(200, models));
});


export const deleteKrumModel = CatchAsync(async (req, res, next) => {

  const KrumModel = await KrumModel.findByIdAndDelete(req.query.id);
  if(!KrumModel){
      return next(new ApiError(404,"KrumModel not found"));
  }
  return res.status(200).json(new ApiResponse(200, { message: 'KrumModel deleted successfully!' }));
});



// export const dropARModel = async (req, res, next) => {
//   try {
//     console.log("Request received:", {
//       file: req.file,
//       body: req.body,
//     });

//     if (!req.file) {
//       return next(new ApiError(400, 'File is required.'));
//     }

//     const { name, description, longitude, latitude } = req.body;

//     if (!longitude || !latitude) {
//       return next(new ApiError(400, 'Location coordinates (longitude and latitude) are required.'));
//     }

//     if (!isValidCoordinate(longitude, latitude)) {
//       return next(new ApiError(400, `Invalid location coordinates. Longitude must be between -180 and 180, Latitude must be between -90 and 90.`));
//     }

//     const fileName = `${Date.now()}-${req.file.originalname}`;
//     const bucket = storage.bucket(bucketName);
//     const file = bucket.file(fileName);

//     const stream = file.createWriteStream({
//       metadata: { contentType: req.file.mimetype },
//     });

//     stream.on('error', (err) => {
//       console.error("File upload error:", err);
//       next(new ApiError(500, `File upload failed: ${err.message}`));
//     });

//     stream.on('finish', async () => {
//       const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;

//       const newARModel = await ARModel.create({
//         name,
//         description,
//         fileUrl: publicUrl,
//         location: { type: 'Point', coordinates: [longitude, latitude] },
//         createdBy: req.user.id,
//       });

//       res.status(201).json(new ApiResponse(201, { message: 'AR model dropped!', model: newARModel }));
//     });

//     stream.end(req.file.buffer);
//   } catch (error) {
//     console.error("Error in dropARModel:", error.message);
//     next(new ApiError(500, error.message));
//   }
// };

// export const collectARModel = async (req, res, next) => {
//   try {
//     const { modelId } = req.params;
//     if (!req.body) {
//       return next(new ApiError(400, 'No request body provided.'));
//     }

//     const arModel = await ARModel.findById(modelId);
//     if (!arModel) return next(new ApiError(404, 'AR model not found.'));

// if (arModel.collectedBy.includes(req.user.id)) {
//   return next(new ApiError(400, 'You have already collected this model.'));
// }
// arModel.collectedBy.push(req.user.id);
// await arModel.save();

// const user = await User.findById(req.user.id);
//     if (!user) {
//       return next(new ApiError(404, 'User not found.'));
//     }

    
//     user.collectedModels = user.collectedModels || []; 
//     user.collectedModels.push(modelId);
//     await user.save();

//     res.status(200).json(new ApiResponse(200, { message: 'Model collected!', model: arModel }));
//   } catch (error) {
//     console.error("Error in collectARModel:", error.message);
//     next(new ApiError(500, error.message));
//   }
// };



export default {
    uploadKrumModel,
    getKrumModels,
    deleteKrumModel
};
