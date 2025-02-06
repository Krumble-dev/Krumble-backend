import express from "express";
import authenticaToken from "../Middleware/auth.js";
import multer from "multer";

import krumModelControllers from "../Controllers/krummodel.controllers.js";

const router = express.Router();
const upload = multer();
// router.use(authenticaToken);

router.post(
  "/create",
  upload.fields([
    { name: "imagefile", maxCount: 1 },
    { name: "modelfile", maxCount: 1 },
  ]),
  krumModelControllers.uploadKrumModel
);
router.get("/getkrummodels", krumModelControllers.getKrumModels);
router.delete("/deletekrummodel", krumModelControllers.deleteKrumModel);

export default router;
