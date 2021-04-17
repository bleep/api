import { Context } from "koa";
import Team from "../models/team";

export const getTeams = async (ctx: Context): Promise<void> => {
  try {
    ctx.body = await Team.find({ owner: ctx.state.user._id });
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const createTeam = async (ctx: Context): Promise<void> => {
  const { name } = ctx.request.body;

  const team = new Team({ name, owner: ctx.state.user._id });

  try {
    ctx.status = 201;
    ctx.body = await team.save();
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const getTeam = async (ctx: Context): Promise<void> => {
  try {
    const team = await Team.findById(ctx.params.teamId);

    if (team === null) {
      ctx.throw(404, new Error("Team not found."));
    }

    ctx.body = team;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteTeam = async (ctx: Context): Promise<void> => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(ctx.params.teamId);

    if (deletedTeam === null) {
      ctx.throw(404, new Error("Team not found."));
    }

    ctx.body = deletedTeam;
  } catch (e) {
    ctx.throw(400, e);
  }
};
