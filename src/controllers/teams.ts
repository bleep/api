import { Context } from "koa";
import * as z from "zod";
import {
  createTeam,
  removeTeam,
  retrieveTeam,
  retrieveTeamsUserOwns,
  updateTeam,
} from "../services/teams";

export const getTeams = async (ctx: Context): Promise<void> => {
  ctx.body = await retrieveTeamsUserOwns(ctx.state.user._id);
};

export const postTeams = async (ctx: Context): Promise<void> => {
  const bodySchema = z.object({
    name: z.string().optional(),
  });
  const { name = "New Team" } = bodySchema.parse(ctx.request.body);

  ctx.status = 201;
  ctx.body = await createTeam({ name, owner: ctx.state.user._id });
};

export const getTeam = async (ctx: Context): Promise<void> => {
  const paramsSchema = z.object({ teamId: z.string() });
  const { teamId } = paramsSchema.parse(ctx.params);

  ctx.body = await retrieveTeam(teamId);
};

export const deleteTeam = async (ctx: Context): Promise<void> => {
  const paramsSchema = z.object({ teamId: z.string() });
  const { teamId } = paramsSchema.parse(ctx.params);

  ctx.body = await removeTeam(teamId);
};

export const patchTeam = async (ctx: Context): Promise<void> => {
  const bodySchema = z.object({
    name: z.string().optional(),
    owner: z.string().optional(),
    collaborators: z.string().array().optional(),
  });
  const { owner, name, collaborators } = bodySchema.parse(ctx.request.body);

  ctx.body = await updateTeam(ctx.params.teamId, {
    name,
    owner,
    collaborators,
  });
};
