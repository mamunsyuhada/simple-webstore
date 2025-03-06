import dotenv from "dotenv";
dotenv.config();

import fastify from "fastify";
import formbody from "@fastify/formbody";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";

import userRouter from "./modules/user/router";
import { loadConfig, infras } from "./configs/env.config";
import { utils } from "./utils";

loadConfig();

const startServer = async () => {
  const envToLogger = {
    development: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
    production: true,
    test: false,
  };
  const server = fastify({ logger: envToLogger[infras.NODE_ENV] ?? true });

  // Register middlewares
  server.register(formbody);
  server.register(cors);
  server.register(helmet);

  // Register routes
  server.register(userRouter, { prefix: "/api/user" });

  // Set error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);
    reply.status(500).send({ error: "Something went wrong" });
  });

  // Health check route
  server.get("/health", async (_request, reply) => {
    try {
      await utils.healthCheck();
      reply.status(200).send({
        message: "Health check endpoint success.",
      });
    } catch (e) {
      reply.status(500).send({
        message: `Health check endpoint failed. ${e.message}`,
      });
    }
  });

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await server.close();
        server.log.error(`Closed application on ${signal}`);
        process.exit(0);
      } catch (err) {
        server.log.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });

  // Start server
  try {
    await server.listen({
      port: infras.API_PORT,
      host: infras.API_HOST,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

startServer();
