import {Router} from 'express';

import Usercontrollers from '../Controllers/User.controllers.js';
import authenticaToken from '../Middleware/auth.js'

// import profilecontrollers from "../Controllers/profile.controller.js"

const router = Router();

//modif
router.post('/signup',Usercontrollers.handleSignup);

router.post('/login',Usercontrollers.handleLogin);
router.post('/googleauth',Usercontrollers.handleGoogleAuth);

// router.get('/profile', authenticaToken, Usercontrollers.getUserProfile);




export default router;
