require("dotenv").config();
import { Router } from "express";

import RoleController from "../controllers/RoleController";

const routes = new Router();

// Rotas pra conteudo de tutoriais e materiais
routes.get(`${process.env.PATH_INIT}role`, RoleController.findAll);
routes.post(`${process.env.PATH_INIT}role`, RoleController.create);
export default routes;
