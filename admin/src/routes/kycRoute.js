import {kycRegister, kycRegisterList, kycRegisterUpdate} from "../controllers/kycController.js";
import route from 'express';
import uploadProfile from '../middleware/multer.js';

const kycRouter = route.Router();
kycRouter.post('/register', uploadProfile.single('profile'), kycRegister);
kycRouter.get('/list', kycRegisterList);
kycRouter.post('/check/:id', kycRegisterUpdate);

export default kycRouter;