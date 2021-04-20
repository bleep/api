import { Context } from "koa";
import * as z from "zod";
import { createRecovery, removeRecovery } from "../services/recoveries";

export const postRecoveries = async (ctx: Context): Promise<void> => {
  try {
    const schema = z.object({ email: z.string() });
    const { email } = schema.parse(ctx.request.body);

    await createRecovery(email);

    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteRecovery = async (ctx: Context): Promise<void> => {
  try {
    const schema = z.object({ recoveryId: z.string() });
    const { recoveryId } = schema.parse(ctx.params);

    ctx.body = await removeRecovery(recoveryId);
  } catch (e) {
    ctx.throw(400, e);
  }
};
