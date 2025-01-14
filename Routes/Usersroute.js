import {Router} from 'express';

import Usercontrollers from '../Controllers/User.controllers.js';
import authenticateToken from '../Middleware/auth.js';
const router = Router();


router.post("/create", Usercontrollers.createUser);
router.patch("/update",authenticateToken,Usercontrollers.HandleUserUpdate)



export default router;
