require("dotenv").config();
import { Router } from "express";

import InventoryProductController from "../controllers/InventoryProductController";

const routes = new Router();
// Rotas pra conteudo de tutoriais e materiais
routes.get(
  process.env.PATH_INIT + "inventory-product",
  InventoryProductController.findAllPagination
);
routes.get(
  process.env.PATH_INIT + "inventory-product/:id",
  InventoryProductController.findByPk
);
routes.post(
  `${process.env.PATH_INIT}inventory-product`,
  InventoryProductController.create
);

routes.put(
  `${process.env.PATH_INIT}inventory-product/:id`,
  InventoryProductController.update
);
routes.delete(process.env.PATH_INIT + "inventory-product/:id", InventoryProductController.delete);

export default routes;
