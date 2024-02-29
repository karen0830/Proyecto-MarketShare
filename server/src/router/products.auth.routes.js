import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getAllProductCompany } from "../controllers/products.auth.controller.js";
const routerProduct = Router();

routerProduct.get("/getAllProductsCompany", authRequired, getAllProductCompany)

export default routerProduct;
