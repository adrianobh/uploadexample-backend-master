require("dotenv").config();
import { Router } from "express";

import ReportController from "../controllers/ReportController";

const routes = new Router();

// Rotas para os pedidos.
routes.get(process.env.PATH_INIT + "reports/month", ReportController.findMonth);
routes.get(process.env.PATH_INIT + "reports/user", ReportController.findUser);
routes.get(process.env.PATH_INIT + "reports/facilitador", ReportController.findFacilitador);

export default routes;
