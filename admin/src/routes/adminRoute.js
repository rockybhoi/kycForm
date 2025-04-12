import route from 'express';
import { adminLogin, adminDashboard, adminApprove } from '../controllers/adminController.js';

const adminRouter = route.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/dashboard', adminDashboard)
adminRouter.post('/status', adminApprove)

export default adminRouter;
