import { Context } from "koa";
import {
  createVerification,
  removeVerification,
} from "../services/verifications";
import * as z from "zod";

export const postVerifications = async (ctx: Context): Promise<void> => {
  const bodySchema = z.object({ emailId: z.string() });
  const { emailId } = bodySchema.parse(ctx.request.body);

  ctx.status = 201;
  await createVerification({ emailId });
};

export const deleteVerification = async (ctx: Context): Promise<void> => {
  const paramsSchema = z.object({ verificationId: z.string() });
  const { verificationId } = paramsSchema.parse(ctx.params);

  ctx.status = 200;
  await removeVerification(verificationId);
};
