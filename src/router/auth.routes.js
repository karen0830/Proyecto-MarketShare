import { Router } from 'express';
const router = Router();
import { loginUser, registerUser, logout, profileUser, registerCompany, loginCompany, profileCompany, logoutC, verifyToken, upload, profileUpload } from '../controllers/auth.controller.js';
import { authRequired, authRequiredCompany } from '../middlewares/validateToken.js';
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema, CompanyShema, loginCompanyShema } from "../schemas/auth.schemas.js";

router.post('/registerCompany', validateSchema(CompanyShema), registerCompany)
router.post('/registerUser', validateSchema(registerSchema), registerUser);
router.post('/loginCompany', validateSchema(loginCompanyShema), loginCompany)
router.post('/loginUser', validateSchema(loginSchema), loginUser);
router.post('/logoutUser', logout);
router.post('/logoutCompany', logoutC);
router.get('/profileUser', authRequired, profileUser)
router.get('/profileCompany', authRequiredCompany, profileCompany)
router.get('/verify', verifyToken)
router.post('/profileImage', upload.single('file'), profileUpload);
export default router;