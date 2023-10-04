import { Router } from 'express';
const router = Router();
import { login, register, logout, profile, registerCompany, loginCompany, profileCompany, logoutC, verifyToken, upload, profileUpload } from '../controllers/auth.controller.js';
import { authRequired, authRequiredCompany } from '../middlewares/validateToken.js';
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema, CompanyShema, loginCompanyShema } from "../schemas/auth.schemas.js";

router.post('/registerC', validateSchema(CompanyShema), registerCompany)
router.post('/register', validateSchema(registerSchema), register);
router.post('/loginC', validateSchema(loginCompanyShema), loginCompany)
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.post('/logoutC', logoutC);
router.get('/profile', authRequired, profile)
router.get('/profileC', authRequiredCompany, profileCompany)
router.get('/verify', verifyToken)
router.post('/profileImage', upload.single('file'), profileUpload);
export default router;