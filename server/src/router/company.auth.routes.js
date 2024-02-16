import { Router } from "express";
const routerCompany = Router();
import {
    loginCompany,
    profileCompany,
    registerCompany,
    logoutCompany
} from "../controllers/company.auth.controller.js";
import { validateSchemaCompany } from "../middlewares/validator.js";
import { CompanyShema, loginCompanyShema } from "../schemas/auth.schemas.js";
import { authRequiredCompany } from "../middlewares/validateToken.js";

routerCompany.post("/registerCompany", validateSchemaCompany(CompanyShema), registerCompany);
routerCompany.post("/loginCompany", validateSchemaCompany(loginCompanyShema), loginCompany);
routerCompany.post("/logoutCompany", logoutCompany);
routerCompany.get("/profileCompany", authRequiredCompany, profileCompany);
export default routerCompany;