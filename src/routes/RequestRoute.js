require("dotenv").config();
import { Router } from "express";

import RequestController from "../controllers/RequestController";

const routes = new Router();

// Rotas para os pedidos.
routes.get(process.env.PATH_INIT + "requests", RequestController.findAllPagination);
routes.get(process.env.PATH_INIT + "requests/:id", RequestController.findOne);
routes.post(process.env.PATH_INIT + "requests", RequestController.create);
routes.delete(process.env.PATH_INIT + "requests/:id", RequestController.delete);
export default routes;
