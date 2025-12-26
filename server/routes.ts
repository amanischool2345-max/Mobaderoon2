import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  setupAuth(app);

  // Initiatives routes
  app.get(api.initiatives.list.path, async (req, res) => {
    const initiativesList = await storage.getInitiatives();
    res.json(initiativesList);
  });

  app.post(api.initiatives.create.path, async (req, res) => {
    try {
      const input = api.initiatives.create.input.parse(req.body);
      const initiative = await storage.createInitiative(input);
      res.status(201).json(initiative);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.initiatives.delete.path, async (req, res) => {
    try {
      const id = Number(req.params.id);
      await storage.deleteInitiative(id);
      res.sendStatus(204);
    } catch (err) {
      return res.status(404).json({ message: 'Initiative not found' });
    }
  });

  app.get("/api/discussions", async (req, res) => {
    const discussionsList = await storage.getDiscussions();
    res.json(discussionsList);
  });

  app.post("/api/discussions", async (req, res) => {
    try {
      const { name, message } = req.body;
      if (!name || !message) {
        return res.status(400).json({ message: "Name and message are required" });
      }
      const discussion = await storage.createDiscussion({ name, message });
      res.status(201).json(discussion);
    } catch (err) {
      res.status(500).json({ message: "Failed to create discussion" });
    }
  });

  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  return httpServer;
}
