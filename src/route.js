import { Router } from "express";
import UserRoute from "./routes/UserRoute";
import CityRoute from "./routes/CityRoute";
import RoleRoute from "./routes/RoleRoute";
import ProducerLoteRoute from "./routes/ProducerLoteRoute";
import ProductRoute from "./routes/ProductRoute";
import InventoryProductRoute from "./routes/InventoryProductRoute";
import RequestRoute from './routes/RequestRoute';
import ReportRoute from './routes/ReportRoute';
const routes = new Router();

export default [
  routes,
  UserRoute,
  CityRoute,
  RoleRoute,
  ProducerLoteRoute,
  ProductRoute,
  InventoryProductRoute,
  RequestRoute,
  ReportRoute
];
