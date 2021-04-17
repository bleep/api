import { Context } from "koa";
import {
  createTeam,
  removeTeam,
  retrieveTeam,
  retrieveTeamsUserOwns,
  updateTeam,
} from "../services/teams";

export const getTeams = async (ctx: Context): Promise<void> => {
  try {
    ctx.body = await retrieveTeamsUserOwns(ctx.state.user._id);
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const postTeam = async (ctx: Context): Promise<void> => {
  const { name } = ctx.request.body;

  try {
    ctx.status = 201;
    ctx.body = await createTeam({ name, owner: ctx.state.user._id });
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getTeam = async (ctx: Context): Promise<void> => {
  try {
    ctx.body = await retrieveTeam(ctx.params.teamId);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const deleteTeam = async (ctx: Context): Promise<void> => {
  try {
    ctx.body = await removeTeam(ctx.params.teamId);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const patchTeam = async (ctx: Context): Promise<void> => {
  const { name, owner, collaborators } = ctx.request.body;

  try {
    ctx.body = await updateTeam(ctx.params.teamId, {
      name,
      owner,
      collaborators,
    });
  } catch (e) {
    ctx.throw(400, e);
  }
};
