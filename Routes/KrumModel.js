import express from 'express';
import authenticaToken from '../Middleware/auth.js';
import multer from 'multer';
import KrumModelControllers from '../Controllers/krumModel.controllers.js';


const router = express.Router();
const upload = multer(); 
router.use(authenticaToken); 

// router.post('/drop', upload.single('file'), dropARModel); 
// router.post('/collect/:modelId', collectARModel); 

router.post('/create',upload.single('file'), KrumModelControllers.uploadKrumModel);
router.get('/getkrummodels', KrumModelControllers.getKrumModels);
router.delete('/deletekrummodel', KrumModelControllers.deleteKrumModel);


export default router;
