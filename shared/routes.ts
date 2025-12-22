import { z } from "zod";
import { insertUserSchema, insertInitiativeSchema } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    register: {
      method: "POST" as const,
      path: "/api/register",
      input: insertUserSchema,
      responses: {
        201: z.object({ id: z.number(), username: z.string() }),
        400: errorSchemas.validation,
      },
    },
    login: {
      method: "POST" as const,
      path: "/api/login",
      input: insertUserSchema,
      responses: {
        200: z.object({ id: z.number(), username: z.string() }),
        401: z.object({ message: z.string() }),
      },
    },
    logout: {
      method: "POST" as const,
      path: "/api/logout",
      responses: {
        200: z.void(),
      },
    },
    me: {
      method: "GET" as const,
      path: "/api/user",
      responses: {
        200: z.object({ id: z.number(), username: z.string() }).nullable(),
      },
    },
  },
  initiatives: {
    list: {
      method: "GET" as const,
      path: "/api/initiatives",
      responses: {
        200: z.array(z.object({ 
          id: z.number(), 
          name: z.string(), 
          targetCategory: z.string(), 
          goal: z.string(), 
          timePeriod: z.string(),
          createdAt: z.date().optional(),
        })),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/initiatives",
      input: insertInitiativeSchema,
      responses: {
        201: z.object({ 
          id: z.number(), 
          name: z.string(), 
          targetCategory: z.string(), 
          goal: z.string(), 
          timePeriod: z.string(),
          createdAt: z.date().optional(),
        }),
        400: errorSchemas.validation,
      },
    },
    delete: {
      method: "DELETE" as const,
      path: "/api/initiatives/:id",
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
