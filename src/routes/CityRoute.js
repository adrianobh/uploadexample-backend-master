require('dotenv').config();
import { Router } from 'express';

import CityController from '../controllers/CityController';

const routes = new Router();

// Rotas pra conteudo de tutoriais e materiais
routes.get(`${process.env.PATH_INIT}city`, CityController.findAll);
routes.post(`${process.env.PATH_INIT}city`, CityController.create);
export default routes;