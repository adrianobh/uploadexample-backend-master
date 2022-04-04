require("dotenv").config();
import { Router } from "express";

import UserController from "../controllers/UserController";

const routes = new Router();

// Rotas pra conteudo de tutoriais e materiais
routes.post(process.env.PATH_INIT + "login", UserController.index);
routes.post(process.env.PATH_INIT + "user", UserController.create);
routes.post(process.env.PATH_INIT + "login-google", UserController.LoginGoogle);
routes.get(process.env.PATH_INIT + "users", UserController.findAllPagination);
routes.get(process.env.PATH_INIT + "users-role", UserController.findUserByRole);
routes.get(process.env.PATH_INIT + "users/:id", UserController.show);
routes.put(process.env.PATH_INIT + "users/:id", UserController.update);
routes.delete(process.env.PATH_INIT + "users/:id", UserController.delete);
routes.put(
  process.env.PATH_INIT + "update-password/:id",
  UserController.updatePassword
);

export default routes;
