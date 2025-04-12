import route from 'express';
import { userRegister, userLogin } from '../controllers/userController.js';
const userRouter = route.Router();
userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);


export default userRouter;