import express from 'express';
import authenticaToken from '../Middleware/auth.js';
import multer from 'multer';

import krumModelControllers from '../Controllers/krumModel.controllers.js';


const router = express.Router();
const upload = multer(); 
router.use(authenticaToken); 

// router.post('/drop', upload.single('file'), dropARModel); 
// router.post('/collect/:modelId', collectARModel); 

router.post('/create',upload.single('file'), krumModelControllers.uploadKrumModel);
router.get('/getkrummodels', krumModelControllers.getKrumModels);
router.delete('/deletekrummodel', krumModelControllers.deleteKrumModel);


export default router;
