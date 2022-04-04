require("dotenv").config();
import { Router } from "express";

import ProducerLoteController from "../controllers/ProducerLoteController";

const routes = new Router();

// Rotas pra conteudo de tutoriais e materiais
routes.get(
  `${process.env.PATH_INIT}producer-lotes`,
  ProducerLoteController.findAll
);
routes.post(
  `${process.env.PATH_INIT}producer-lotes`,
  ProducerLoteController.create
);
routes.put(
  `${process.env.PATH_INIT}producer-lotes/:id`,
  ProducerLoteController.update
);
routes.delete(
  `${process.env.PATH_INIT}producer-lotes/:id`,
  ProducerLoteController.delete
);
export default routes;
