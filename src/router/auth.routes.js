import { Router } from 'express';
const router = Router();
import { loginUser, registerUser, logoutUser, profileUser, registerCompany, loginCompany, profileCompany, logoutCompany, imageProfile, verifyToken, addStories, archivedStories, publications, addPublications} from '../controllers/auth.controller.js';
import { authRequired, authRequiredCompany } from '../middlewares/validateToken.js';
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema, CompanyShema, loginCompanyShema } from "../schemas/auth.schemas.js";


router.post('/registerCompany', validateSchema(CompanyShema), registerCompany)
router.post('/registerUser', validateSchema(registerSchema), registerUser);
router.post('/loginCompany', validateSchema(loginCompanyShema), loginCompany)
router.post('/loginUser', validateSchema(loginSchema), loginUser);
router.post('/logoutUser', logoutUser);
router.post('/logoutCompany', logoutCompany);
router.get('/profileUser', authRequired,  profileUser)
router.get('/profileCompany', authRequiredCompany, profileCompany)
router.get('/verify', verifyToken)
router.post('/imageProfile', imageProfile)
router.post('/addStories', addStories)
router.put('/archivedStory', archivedStories)
router.post("/publications", addPublications);
export default router;