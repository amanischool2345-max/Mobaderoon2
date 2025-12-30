import { users, initiatives, discussions, type User, type InsertUser, type Initiative, type InsertInitiative, type Discussion, type InsertDiscussion } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import path from "path";
import fs from "fs/promises";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getInitiatives(): Promise<Initiative[]>;
  createInitiative(initiative: InsertInitiative): Promise<Initiative>;
  deleteInitiative(id: number): Promise<void>;
  getDiscussions(): Promise<Discussion[]>;
  createDiscussion(discussion: InsertDiscussion): Promise<Discussion>;
  uploadFile(buffer: Buffer, originalName: string): Promise<{ url: string }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getInitiatives(): Promise<Initiative[]> {
    return await db.select().from(initiatives).orderBy(desc(initiatives.createdAt));
  }

  async createInitiative(initiative: InsertInitiative): Promise<Initiative> {
    const [newInitiative] = await db.insert(initiatives).values(initiative).returning();
    return newInitiative;
  }

  async deleteInitiative(id: number): Promise<void> {
    await db.delete(initiatives).where(eq(initiatives.id, id));
  }

  async getDiscussions(): Promise<Discussion[]> {
    return await db.select().from(discussions).orderBy(desc(discussions.createdAt));
  }

  async createDiscussion(discussion: InsertDiscussion): Promise<Discussion> {
    const [newDiscussion] = await db.insert(discussions).values(discussion).returning();
    return newDiscussion;
  }

  async uploadFile(buffer: Buffer, originalName: string): Promise<{ url: string }> {
    const fileName = `${Date.now()}-${originalName}`;
    const uploadDir = path.join(process.cwd(), "uploads");
    
    // Ensure uploads directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir);
    }

    const filePath = path.join(uploadDir, fileName);
    await fs.writeFile(filePath, buffer);
    
    // Return a relative URL that the frontend can use
    return { url: `/uploads/${fileName}` };
  }
}

export const storage = new DatabaseStorage();
