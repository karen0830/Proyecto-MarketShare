import { Router } from "express";
import { authRequired, authRequiredCompany } from "../middlewares/validateToken.js";
import { getAllProductCompany, updateProduct } from "../controllers/products.auth.controller.js";
import { getProductsId } from "../controllers/company.auth.controller.js";
const routerProduct = Router();

routerProduct.get("/getAllProductsCompany", getAllProductCompany)
routerProduct.get("/getProductsId", authRequiredCompany, getProductsId)
routerProduct.put("/updateProduct", authRequiredCompany, updateProduct);
export default routerProduct;
