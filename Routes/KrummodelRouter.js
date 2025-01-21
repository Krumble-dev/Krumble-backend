import express from 'express';
import { dropARModel, collectARModel } from '../Controllers/krummodel.controllers.js';
import authenticaToken from '../Middleware/auth.js';
import multer from 'multer';

const router = express.Router();
const upload = multer(); 
router.use(authenticaToken); 

router.post('/drop', upload.single('file'), dropARModel); 
router.post('/collect/:modelId', collectARModel); 

export default router;
