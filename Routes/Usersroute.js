import {Router} from 'express';

import Usercontrollers from '../Controllers/User.controllers.js';

const router = Router();

router.post("/user", Usercontrollers.createUser);



export default router;
