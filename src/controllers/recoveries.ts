import { Context } from "koa";
import * as z from "zod";
import { createRecovery, removeRecovery } from "../services/recoveries";

export const postRecoveries = async (ctx: Context): Promise<void> => {
  const bodySchema = z.object({ emailAddress: z.string().email() });
  const { emailAddress } = bodySchema.parse(ctx.request.body);

  await createRecovery(emailAddress);

  ctx.status = 201;
};

export const deleteRecovery = async (ctx: Context): Promise<void> => {
  const paramsSchema = z.object({ recoveryId: z.string() });
  const { recoveryId } = paramsSchema.parse(ctx.params);

  ctx.body = await removeRecovery(recoveryId);
};
