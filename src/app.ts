import express, { Application } from "express";

import BaseApiController from "./controllers/base-api-controller";
import healthCheckController from "./controllers/health-check.controller";
import githubWebhookController from "./controllers/github-webhook.controller";

class App {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  listen(port: number, callback?: () => void) {
    this.app.listen(port, callback);
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    this.addController(healthCheckController);
    this.addController(githubWebhookController);
  }

  private addController(controller: BaseApiController) {
    this.app.use(`/api/v1/${controller.baseUrl}`, controller.router);
  }
}

export default new App(express());
