import { Router } from "express";
const routerCompany = Router();
import {
    loginCompany,
    registerCompany,
    logoutCompany,
    verifyTokenCompany
} from "../controllers/company.auth.controller.js";
import { validateSchemaCompany } from "../middlewares/validator.js";
import { CompanyShema, loginCompanyShema } from "../schemas/auth.schemas.js";
import { authRequiredCompany } from "../middlewares/validateToken.js";

routerCompany.post("/registerCompany", validateSchemaCompany(CompanyShema), registerCompany);
routerCompany.post("/loginCompany", validateSchemaCompany(loginCompanyShema), loginCompany);
routerCompany.post("/logoutCompany", logoutCompany);
routerCompany.get("/verifyCompany", authRequiredCompany, verifyTokenCompany);
export default routerCompany;