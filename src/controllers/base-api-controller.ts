import express from "express";

abstract class BaseApiController {
  public readonly router: express.Router;
  public readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.router = express.Router();
    this.baseUrl = baseUrl;
    this.setupRoutes();
  }

  protected abstract setupRoutes(): void;
}

export default BaseApiController;
