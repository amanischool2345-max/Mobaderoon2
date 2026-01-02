import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  setupAuth(app);

  // File upload route
  app.post("/api/upload", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    try {
      const { url } = await storage.uploadFile(req.file.buffer, req.file.originalname);
      res.json({ url });
    } catch (err) {
      res.status(500).json({ message: "Upload failed" });
    }
  });

  // Stars routes
  app.get("/api/stars", async (req, res) => {
    const starsList = await storage.getStars();
    res.json(starsList);
  });

  app.post("/api/stars", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const user = req.user as any;
    if (user.role !== "teacher" && user.username !== "Amanileen2016@gmail.com") {
      return res.status(403).send("Only teachers/admin can create stars");
    }
    try {
      const star = await storage.createStar(req.body);
      res.status(201).json(star);
    } catch (err) {
      res.status(500).json({ message: "Failed to create star" });
    }
  });

  app.delete("/api/stars/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const user = req.user as any;
    if (user.role !== "teacher" && user.username !== "Amanileen2016@gmail.com") {
      return res.status(403).send("Only teachers/admin can delete stars");
    }
    try {
      const id = Number(req.params.id);
      await storage.deleteStar(id);
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: "Failed to delete star" });
    }
  });

  // Initiatives routes
  app.get(api.initiatives.list.path, async (req, res) => {
    const initiativesList = await storage.getInitiatives();
    res.json(initiativesList);
  });

  app.post(api.initiatives.create.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    const user = req.user as any;
    const username = user.username.trim();
    if (user.role !== "teacher" && username !== "Amanileen2016@gmail.com") {
      return res.status(403).json({ message: "Only teachers/admin can create initiatives" });
    }
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
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.initiatives.delete.path, async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const user = req.user as any;
    if (user.role !== "teacher" && user.username !== "Amanileen2016@gmail.com") {
      return res.status(403).send("Only teachers/admin can delete initiatives");
    }
    try {
      const id = Number(req.params.id);
      await storage.deleteInitiative(id);
      res.sendStatus(204);
    } catch (err) {
      return res.status(404).json({ message: 'Initiative not found' });
    }
  });

  app.post("/api/initiatives/:id/like", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const updated = await storage.likeInitiative(id);
      res.json(updated);
    } catch (err) {
      res.status(404).json({ message: "Initiative not found" });
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
