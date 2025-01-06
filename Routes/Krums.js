import {Router} from 'express';

import krumControllers from '../Controllers/krum.controllers.js';


const router = Router();


router.post("/create",krumControllers.createKrum);

router.get("/get",krumControllers.getKrums);

router.get("/get/:id",krumControllers.getKrum);

router.patch("/update/:id",krumControllers.updateKrum);

router.delete("/delete/:id",krumControllers.deleteKrum);

export default router;


