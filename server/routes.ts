import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  setupAuth(app);

  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  return httpServer;
}
