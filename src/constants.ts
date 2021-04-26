import * as z from "zod";

const environmentSchema = z
  .object({
    MONGO_DB_CONNECTION_URL: z.string().url(),
    JWT_SECRET: z.string(),
    STRIPE_API_KEY: z.string(),
    SENDGRID_API_KEY: z.string(),
    SENDGRID_SENDER_FROM_EMAIL_ADDRESS: z.string(),
    WEB_CLIENT_URL: z.string().url(),
    PORT: z.string().optional(),
  })
  .nonstrict();

export const ENVIRONMENT = environmentSchema.parse(process.env);
