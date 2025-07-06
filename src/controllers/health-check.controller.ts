import { Request, Response } from "express";

import BaseApiController from "./base-api-controller";

class HealthCheckController extends BaseApiController {
  constructor() {
    super("health");
  }

  setupRoutes() {
    this.router.get("/", this.getHealth);
  }

  private getHealth(req: Request, res: Response) {
    res.json({ message: "Server is healthy!" });
  }
}

export default new HealthCheckController();
