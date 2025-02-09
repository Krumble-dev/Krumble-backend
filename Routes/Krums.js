import {Router} from 'express';

import krumControllers from '../Controllers/krum.controllers.js';
import authenticaToken from '../Middleware/auth.js'


const router = Router();

router.use(authenticaToken);

router.post("/create",krumControllers.createKrum);

router.get("/getkrums",krumControllers.getKrums);

router.get("/getkrum",krumControllers.getKrum);

router.patch("/updatekrum",krumControllers.updateKrum);

router.delete("/deletekrum",krumControllers.deleteKrum);

router.get("/nearbykrums",krumControllers.nearbyKrums);

router.get("/getallkrums",krumControllers.getallkrums); 

router.get("/collectedkrums",krumControllers.collectedKrums);

export default router;


