import express from "express";
import cors from "cors";
import route from "./route";

import "./database";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    if (process.env.NODE_ENV === "development") {
      this.server.use((req, res, next) => {
        next();
      });
    }
  }

  routes() {
    this.server.use(route);
  }
}

export default new App().server;
