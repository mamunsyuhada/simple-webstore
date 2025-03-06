import path from 'path';
import Joi from 'joi';
import dotenv from 'dotenv';

export function loadConfig(): void {
  const envPath = path.join(__dirname, '..', '..', '.env');
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    throw new Error(
      `Failed to load .env file from path ${envPath}: ${result.error.message}`,
    );
  }

  const schema = Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'testing', 'production')
      .required(),
    LOG_LEVEL: Joi.string()
      .valid('debug', 'info', 'warn', 'error', 'fatal')
      .required(),
    API_HOST: Joi.string().required(),
    API_PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    APP_JWT_SECRET: Joi.string().required(),
  }).unknown(true);

  const { error } = schema.validate(process.env, { abortEarly: false });

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }
}

export const infras = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  APP_JWT_SECRET: process.env.APP_JWT_SECRET as string,
  NODE_ENV: process.env.NODE_ENV as string,
  LOG_LEVEL: process.env.LOG_LEVEL as string,
  API_HOST: process.env.API_HOST as string,
  API_PORT: Number(process.env.API_PORT),
};