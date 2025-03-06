import { FastifyInstance } from "fastify";

import userApiHandler from "./api.handler";
async function userRouter(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    {
      schema: {
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", format: "email" },
            password: { type: "string", minLength: 8 },
          },
        },
      },
      config: {
        description: "User login endpoint",
      },
    },
    userApiHandler.login.bind(userApiHandler),
  );
}

export default userRouter;
