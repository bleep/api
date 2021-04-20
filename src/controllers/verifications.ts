import { Context } from "koa";
import {
  createVerification,
  removeVerification,
} from "../services/verifications";
import * as z from "zod";

export const postVerifications = async (ctx: Context): Promise<void> => {
  try {
    const schema = z.object({ emailId: z.string() });
    const { emailId } = schema.parse(ctx.request.body);

    ctx.status = 201;
    await createVerification({ emailId });
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteVerification = async (ctx: Context): Promise<void> => {
  try {
    const requestParamsSchema = z.object({ verificationId: z.string() });

    const { verificationId } = requestParamsSchema.parse(ctx.params);

    ctx.status = 200;
    await removeVerification(verificationId);
  } catch (e) {
    ctx.throw(400, e);
  }
};
