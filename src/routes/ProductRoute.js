require("dotenv").config();
import { Router } from "express";

import ProductController from "../controllers/ProductController";

const routes = new Router();

// Rotas pra conteudo de tutoriais e materiais
routes.get(`${process.env.PATH_INIT}product`, ProductController.findAll);
routes.post(`${process.env.PATH_INIT}product`, ProductController.create);
routes.get(process.env.PATH_INIT + "product/:id", ProductController.show);
routes.put(process.env.PATH_INIT + "product/:id", ProductController.update);
routes.delete(process.env.PATH_INIT + "product/:id", ProductController.delete);
routes.get(`${process.env.PATH_INIT}product-option`, ProductController.findAllOption);


export default routes;
